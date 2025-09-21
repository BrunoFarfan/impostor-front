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
  const [playerToggleStatus, setPlayerToggleStatus] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const [revealResult, setRevealResult] = useState(null);
  const [gameResults, setGameResults] = useState(null);
  const [canStart, setCanStart] = useState(false);
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
      
      await refreshMatchState(code);
      
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
        
        if (data.type === 'match_state_update') {
          if (data.players) {
            setPlayers(data.players);
          }
          if (data.can_start !== undefined) {
            setCanStart(data.can_start);
          }
        }
        
        if (data.type === 'phase_change') {
          if (data.phase === 'role_assignment') {
            setPhase('role');
          } else if (data.phase === 'round') {
            setPhase('round');
            setPlayerToggleStatus(false);
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
        
        if (data.type === 'reveal_result') {
          console.log('Reveal result:', data);
          setRevealResult(data);
        }
        
        if (data.type === 'game_over') {
          setGameResults(data);
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

  const sendRoleProposition = (proposition) => {
    if (websocketService.isConnected() && playerId && proposition.trim()) {
      websocketService.send({ 
        type: 'role_proposition',
        proposition: proposition.trim()
      });
    }
  };

  const sendToggle = (toggleValue) => {
    if (websocketService.isConnected() && isPlayerAlive()) {
      setPlayerToggleStatus(toggleValue);
      websocketService.send({ 
        type: 'toggle', 
        value: toggleValue 
      });
    }
  };

  const selectVote = (playerId) => {
    setSelectedVote(playerId);
  };

  const sendVote = () => {
    if (websocketService.isConnected() && selectedVote && isPlayerAlive()) {
      websocketService.send({ 
        type: 'vote', 
        target: selectedVote 
      });
    }
  };

  const isPlayerAlive = () => {
    if (!playerId || !players.length) return true;
    const currentPlayer = players.find(player => player.id === playerId);
    return currentPlayer ? currentPlayer.alive !== false : true;
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

  const refreshMatchState = async (codeOverride = null) => {
    try {
      setError(null);
      const codeToUse = codeOverride || matchCode;
      const matchState = await matchAPI.getMatchState(codeToUse);
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
    setPlayerToggleStatus(false);
    setSelectedVote(null);
    setRevealResult(null);
    setGameResults(null);
    setCanStart(false);
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
    playerToggleStatus,
    selectedVote,
    revealResult,
    gameResults,
    canStart,
    isConnected,
    lastMessage,
    error,
    isPlayerAlive,
    createMatch,
    joinMatch,
    connectWebSocket,
    disconnectWebSocket,
    sendRoleProposition,
    sendToggle,
    selectVote,
    sendVote,
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
