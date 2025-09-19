import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RoleScreen = () => {
  const { advancePhase } = useGame();

  return (
    <Layout className="role-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Role Screen
        </h1>
        <p className="screen-subtitle text-red-100">
          Your role has been assigned
        </p>
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-red"
        >
          Start Round
        </button>
      </div>
    </Layout>
  );
};

export default RoleScreen;
