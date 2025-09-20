import React, { createContext, useContext, useState } from 'react';
import { matchAPI } from '../services/api';
import websocketService from '../services/websocket';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [phase, setPhase] = useState('home');
  const [matchCode, setMatchCode] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState(null);
  const [playerRole, setPlayerRole] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);

  const createMatch = async (name) => {
    try {
      setError(null);
      setPlayerName(name);
      
      // Create the match
      const createResponse = await matchAPI.createMatch();
      const newMatchCode = createResponse.match_code;
      setMatchCode(newMatchCode);
      
      // Join the match with the player's name
      const joinResponse = await matchAPI.joinMatch(name, newMatchCode);
      setPlayerId(joinResponse.player_id);
      
      setPhase('lobby');
      return createResponse;
    } catch (error) {
      setError('Failed to create match');
      console.error('Error creating match:', error);
      throw error;
    }
  };

  const joinMatch = async (name, code) => {
    try {
      setError(null);
      setPlayerName(name);
      const response = await matchAPI.joinMatch(name, code);
      setPlayerId(response.player_id);
      setMatchCode(code);
      setPhase('lobby');
      return response;
    } catch (error) {
      setError('Failed to join match');
      console.error('Error joining match:', error);
      throw error;
    }
  };

  const connectWebSocket = () => {
    if (matchCode && playerId) {
      websocketService.connect(matchCode, playerId);

      websocketService.on('connected', () => {
        setIsConnected(true);
        setError(null);
      });

      websocketService.on('disconnected', () => {
        setIsConnected(false);
      });

      websocketService.on('message', (data) => {
        setLastMessage(data);
        
        if (data.type === 'lobby_update' && data.players) {
          setPlayers(data.players);
        }
        
        if (data.type === 'phase_change') {
          if (data.phase === 'role_assignment') {
            setPhase('role');
          } else if (data.phase === 'round') {
            setPhase('round');
          } else if (data.phase === 'voting') {
            setPhase('voting');
          } else if (data.phase === 'reveal') {
            setPhase('reveal');
          } else if (data.phase === 'game_over') {
            setPhase('gameover');
          }
        }
        
        if (data.type === 'role_assignment' && data.role) {
          setPlayerRole(data.role);
        }
      });

      websocketService.on('error', (data) => {
        setError(data.error);
      });
    }
  };

  const disconnectWebSocket = () => {
    websocketService.disconnect();
    setIsConnected(false);
    setLastMessage(null);
  };

  const sendTestMessage = () => {
    if (websocketService.isConnected()) {
      websocketService.send({ message: 'hello' });
    }
  };

  const startGame = async () => {
    try {
      setError(null);
      await matchAPI.startMatch(matchCode);
    } catch (error) {
      setError('Failed to start game');
      console.error('Error starting game:', error);
      throw error;
    }
  };

  const refreshMatchState = async () => {
    try {
      setError(null);
      const matchState = await matchAPI.getMatchState(matchCode);
      if (matchState.players) {
        setPlayers(matchState.players);
      }
    } catch (error) {
      setError('Failed to refresh match state');
      console.error('Error refreshing match state:', error);
      throw error;
    }
  };

  const advancePhase = () => {
    const phases = ['home', 'lobby', 'role', 'round', 'voting', 'reveal', 'gameover'];
    const currentIndex = phases.indexOf(phase);
    if (currentIndex < phases.length - 1) {
      setPhase(phases[currentIndex + 1]);
    }
  };

  const resetGame = () => {
    disconnectWebSocket();
    setPhase('home');
    setMatchCode(null);
    setPlayerId(null);
    setPlayerRole(null);
    setPlayers([]);
    setIsConnected(false);
    setLastMessage(null);
    setError(null);
  };

  const value = {
    phase,
    setPhase,
    matchCode,
    playerName,
    playerId,
    playerRole,
    players,
    isConnected,
    lastMessage,
    error,
    createMatch,
    joinMatch,
    connectWebSocket,
    disconnectWebSocket,
    sendTestMessage,
    startGame,
    refreshMatchState,
    advancePhase,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
