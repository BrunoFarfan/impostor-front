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
      await matchAPI.joinMatch(name, newMatchCode);
      
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
    if (matchCode) {
      websocketService.connect(matchCode);

      websocketService.on('connected', () => {
        setIsConnected(true);
        setError(null);
      });

      websocketService.on('disconnected', () => {
        setIsConnected(false);
      });

      websocketService.on('message', (data) => {
        setLastMessage(data);
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
    setIsConnected(false);
    setLastMessage(null);
    setError(null);
  };

  const value = {
    phase,
    setPhase,
    matchCode,
    playerName,
    isConnected,
    lastMessage,
    error,
    createMatch,
    joinMatch,
    connectWebSocket,
    disconnectWebSocket,
    sendTestMessage,
    advancePhase,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
