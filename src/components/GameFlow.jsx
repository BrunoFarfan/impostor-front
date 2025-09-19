import React from 'react';
import { useGame } from '../context/GameContext';
import HomeScreen from '../screens/HomeScreen';
import LobbyScreen from '../screens/LobbyScreen';
import RoleScreen from '../screens/RoleScreen';
import RoundScreen from '../screens/RoundScreen';
import VotingScreen from '../screens/VotingScreen';
import RevealScreen from '../screens/RevealScreen';
import GameOverScreen from '../screens/GameOverScreen';

const GameFlow = () => {
  const { phase } = useGame();

  const renderScreen = () => {
    switch (phase) {
      case 'home':
        return <HomeScreen />;
      case 'lobby':
        return <LobbyScreen />;
      case 'role':
        return <RoleScreen />;
      case 'round':
        return <RoundScreen />;
      case 'voting':
        return <VotingScreen />;
      case 'reveal':
        return <RevealScreen />;
      case 'gameover':
        return <GameOverScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return renderScreen();
};

export default GameFlow;
