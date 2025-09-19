import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const GameOverScreen = () => {
  const { resetGame } = useGame();

  return (
    <Layout className="game-over-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Game Over Screen
        </h1>
        <p className="screen-subtitle text-gray-300">
          The game has ended
        </p>
        <button 
          onClick={resetGame}
          className="nav-button nav-button-gray"
        >
          Play Again
        </button>
      </div>
    </Layout>
  );
};

export default GameOverScreen;
