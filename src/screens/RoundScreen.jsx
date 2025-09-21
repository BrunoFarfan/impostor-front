import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RoundScreen = () => {
  const { 
    players, 
    playerId, 
    playerToggleStatus, 
    sendToggle, 
    isPlayerAlive,
    advancePhase 
  } = useGame();

  const handleToggle = () => {
    const newToggleStatus = !playerToggleStatus;
    sendToggle(newToggleStatus);
  };

  const alivePlayersForStatus = players.filter(player => player.alive !== false);

  return (
    <Layout className="round-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Round Screen
        </h1>
        <p className="screen-subtitle text-yellow-100">
          Round in progress...
        </p>

        {/* Toggle Button */}
        <div className="mb-8">
          {isPlayerAlive() ? (
            <div className="flex items-center justify-center mb-4">
              <label className="flex items-center cursor-pointer">
                <span className="mr-3 text-lg font-medium text-yellow-100">Ready</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={playerToggleStatus}
                    onChange={handleToggle}
                    className="sr-only"
                  />
                  <div className={`block w-14 h-8 rounded-full ${
                    playerToggleStatus ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                      playerToggleStatus ? 'translate-x-6' : ''
                    }`}></div>
                  </div>
                </div>
                <span className="ml-3 text-lg font-medium text-yellow-100">
                  {playerToggleStatus ? 'Yes' : 'No'}
                </span>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-800 bg-opacity-50 rounded-lg p-4">
                <p className="text-red-200 text-lg font-medium">
                  💀 You have been eliminated
                </p>
                <p className="text-red-300 text-sm mt-2">
                  You can observe the game but cannot interact
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Players Status List - Only show alive players */}
        {alivePlayersForStatus.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-100">Players Status</h2>
            <div className="bg-yellow-800 bg-opacity-50 rounded-lg p-4">
              {alivePlayersForStatus.map((player, index) => (
                <div 
                  key={player.id || index} 
                  className={`flex justify-between items-center py-2 px-3 rounded ${
                    player.id === playerId ? 'bg-yellow-600' : 'bg-yellow-700 bg-opacity-50'
                  } ${index > 0 ? 'mt-2' : ''}`}
                >
                  <span className="text-white font-medium">{player.name}</span>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      player.toggled ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-sm text-yellow-100">
                      {player.toggled ? 'Ready' : 'Not Ready'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Debug button - can be removed later */}
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-yellow"
        >
          Start Voting (Debug)
        </button>
      </div>
    </Layout>
  );
};

export default RoundScreen;
