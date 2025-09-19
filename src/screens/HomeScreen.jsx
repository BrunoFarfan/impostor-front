import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const HomeScreen = () => {
  const { createMatch, joinMatch, error } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMatch = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    try {
      await createMatch(playerName.trim());
    } catch (error) {
      console.error('Failed to create match:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinMatch = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!joinCode.trim()) {
      alert('Please enter a match code');
      return;
    }
    
    setIsLoading(true);
    try {
      await joinMatch(playerName.trim(), joinCode.trim());
    } catch (error) {
      console.error('Failed to join match:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="home-screen">
      <div className="text-center">
        <h1 className="home-title">
          Home Screen
        </h1>
        <p className="home-subtitle text-blue-100">
          Welcome to the Impostor Game
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Player Name Input */}
          <div className="flex flex-col items-center space-y-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-800"
              disabled={isLoading}
            />
          </div>

          {/* Create Match Button */}
          <button 
            onClick={handleCreateMatch}
            disabled={isLoading || !playerName.trim()}
            className="nav-button nav-button-blue"
          >
            {isLoading ? 'Creating...' : 'Create Match'}
          </button>

          {/* Join Match Section */}
          <div className="flex flex-col items-center space-y-2">
            <input
              type="text"
              placeholder="Enter match code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-800"
              disabled={isLoading}
            />
            <button 
              onClick={handleJoinMatch}
              disabled={isLoading || !playerName.trim() || !joinCode.trim()}
              className="nav-button nav-button-blue"
            >
              {isLoading ? 'Joining...' : 'Join Match'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
