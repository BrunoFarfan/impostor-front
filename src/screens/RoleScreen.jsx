import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RoleScreen = () => {
  const { playerRole, advancePhase } = useGame();

  const handleNext = () => {
    advancePhase();
  };

  return (
    <Layout className="role-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Your Role
        </h1>
        
        {playerRole ? (
          <div className="mb-8">
            <div className="bg-red-800 bg-opacity-50 rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold text-white mb-4 capitalize">
                {playerRole}
              </h2>
              <p className="text-red-100 text-lg">
                {playerRole === 'impostor' 
                  ? 'Try to not get caught!' 
                  : 'Describe your character with one concept at a time.'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p className="screen-subtitle text-red-100">
              Waiting for role assignment...
            </p>
          </div>
        )}

        <button 
          onClick={handleNext}
          className="nav-button nav-button-red"
        >
          Start Round
        </button>
      </div>
    </Layout>
  );
};

export default RoleScreen;
