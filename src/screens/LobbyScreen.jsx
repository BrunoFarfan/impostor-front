import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const LobbyScreen = () => {
  const { 
    matchCode, 
    playerName,
    playerId,
    players,
    canStart,
    isConnected, 
    lastMessage, 
    error, 
    connectWebSocket, 
    sendRoleProposition, 
    startGame,
    refreshMatchState 
  } = useGame();

  const [roleProposition, setRoleProposition] = useState('');

  useEffect(() => {
    if (matchCode && playerId && !isConnected) {
      connectWebSocket();
    }
  }, [matchCode, playerId, isConnected, connectWebSocket]);

  // Find current player to check if they are the host
  const currentPlayer = players.find(player => player.id === playerId);
  const isHost = currentPlayer?.host === true;

  const handleSendRoleProposition = () => {
    if (roleProposition.trim()) {
      sendRoleProposition(roleProposition);
      setRoleProposition(''); // Clear input after sending
    }
  };

  return (
    <Layout className="lobby-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Lobby Screen
        </h1>
        <p className="screen-subtitle text-green-100">
          Player: {playerName} | Match Code: {matchCode}
        </p>

        {/* WebSocket Connection Status */}
        <div className="mb-4">
          <div className={`inline-block px-4 py-2 rounded-lg ${
            isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}

        {/* Players List */}
        {players.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-100">Players in Lobby</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center py-2 px-3 rounded ${
                    player.id === playerId ? 'bg-green-600' : 'bg-gray-700'
                  } ${index > 0 ? 'mt-2' : ''}`}
                >
                  <span className="text-white">{player.name}</span>
                  {player.host && (
                    <span className="text-yellow-400 text-sm font-semibold">HOST</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Refresh Button */}
        {isConnected && (
          <div className="mb-4">
            <button 
              onClick={refreshMatchState}
              className="nav-button nav-button-blue mr-2"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Start Game Button (Only for Host) */}
        {isHost && isConnected && (
          <div className="mb-4">
            <button 
              onClick={startGame}
              disabled={!canStart}
              className={`nav-button ${
                canStart 
                  ? 'nav-button-green' 
                  : 'nav-button-gray opacity-50 cursor-not-allowed'
              }`}
            >
              Start Game {!canStart && '(Waiting for role propositions...)'}
            </button>
          </div>
        )}

        {/* Role Proposition */}
        {isConnected && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-green-100">Propose a Role</h3>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={roleProposition}
                onChange={(e) => setRoleProposition(e.target.value)}
                placeholder="Enter a role suggestion..."
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendRoleProposition();
                  }
                }}
              />
              <button 
                onClick={handleSendRoleProposition}
                disabled={!roleProposition.trim()}
                className={`nav-button ${
                  roleProposition.trim() 
                    ? 'nav-button-green' 
                    : 'nav-button-gray opacity-50 cursor-not-allowed'
                }`}
              >
                Send Proposition
              </button>
            </div>
          </div>
        )}

        {/* Last Message Display */}
        {lastMessage && (
          <div className="mb-4 p-3 bg-blue-500 text-white rounded-lg">
            <strong>Last Message:</strong> {JSON.stringify(lastMessage)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LobbyScreen;
