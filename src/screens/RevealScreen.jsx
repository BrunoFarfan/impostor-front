import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RevealScreen = () => {
  const { advancePhase } = useGame();

  return (
    <Layout className="reveal-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Reveal Screen
        </h1>
        <p className="screen-subtitle text-indigo-100">
          The truth is revealed...
        </p>
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-indigo"
        >
          End Game
        </button>
      </div>
    </Layout>
  );
};

export default RevealScreen;
