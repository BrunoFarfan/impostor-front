import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RevealScreen = () => {
  const { revealResult, advancePhase } = useGame();

  return (
    <Layout className="reveal-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Vote Results
        </h1>
        
        {revealResult ? (
          <div className="mb-8">
            <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-8 mb-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Player Eliminated</h2>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-red-400 mb-2">
                  {revealResult.eliminated_player_name}
                </div>
                <div className="text-xl text-indigo-200 mb-4">
                  Role: <span className="font-semibold text-white capitalize">
                    {revealResult.eliminated_player_role}
                  </span>
                </div>
              </div>

              {revealResult.eliminated_player_role === 'impostor' ? (
                <div className="bg-green-600 bg-opacity-50 rounded p-4 mb-4">
                  <p className="text-green-100 text-lg font-medium">
                    🎉 An impostor has been eliminated!
                  </p>
                </div>
              ) : (
                <div className="bg-red-600 bg-opacity-50 rounded p-4 mb-4">
                  <p className="text-red-100 text-lg font-medium">
                    💀 An innocent crew member was eliminated...
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p className="screen-subtitle text-indigo-100">
              Counting votes...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mt-4"></div>
          </div>
        )}

        {/* Debug button - can be removed later */}
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-gray mt-4"
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default RevealScreen;
