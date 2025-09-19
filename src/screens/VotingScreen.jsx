import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const VotingScreen = () => {
  const { advancePhase } = useGame();

  return (
    <Layout className="voting-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Voting Screen
        </h1>
        <p className="screen-subtitle text-purple-100">
          Cast your vote
        </p>
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-purple"
        >
          Reveal Results
        </button>
      </div>
    </Layout>
  );
};

export default VotingScreen;
