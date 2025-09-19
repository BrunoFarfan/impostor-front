import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RoundScreen = () => {
  const { advancePhase } = useGame();

  return (
    <Layout className="round-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Round Screen
        </h1>
        <p className="screen-subtitle text-yellow-100">
          Round in progress...
        </p>
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-yellow"
        >
          Start Voting
        </button>
      </div>
    </Layout>
  );
};

export default RoundScreen;
