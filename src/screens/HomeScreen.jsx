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
          Impostor
        </h1>
        <p className="home-subtitle text-blue-100">
          Crea o únete a una partida
        </p>
        
        <div className="home-form-container">
          <div className="home-form">
            {/* Player Name Input */}
            <input
              type="text"
              placeholder="Introduce tu nombre"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="home-input"
              disabled={isLoading}
            />

            {/* Match Code Input */}
            <input
              type="text"
              placeholder="Introduce el código para unirte"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="home-input"
              disabled={isLoading}
            />

            {/* Action Buttons */}
            <div className="home-buttons-container">
              <button 
                onClick={handleCreateMatch}
                disabled={isLoading || !playerName.trim()}
                className="home-button create"
              >
                {isLoading ? 'Creando...' : 'Crear Partida'}
              </button>

              <button 
                onClick={handleJoinMatch}
                disabled={isLoading || !playerName.trim() || !joinCode.trim()}
                className="home-button join"
              >
                {isLoading ? 'Uniéndose...' : 'Unirse'}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="home-error">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
