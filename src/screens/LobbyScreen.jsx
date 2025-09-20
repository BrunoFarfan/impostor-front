import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const LobbyScreen = () => {
  const { 
    matchCode, 
    playerName,
    playerId,
    players,
    isConnected, 
    lastMessage, 
    error, 
    connectWebSocket, 
    sendTestMessage, 
    startGame,
    refreshMatchState 
  } = useGame();

  useEffect(() => {
    if (matchCode && playerId && !isConnected) {
      connectWebSocket();
    }
  }, [matchCode, playerId, isConnected, connectWebSocket]);

  // Find current player to check if they are the host
  const currentPlayer = players.find(player => player.id === playerId);
  const isHost = currentPlayer?.host === true;

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
              className="nav-button nav-button-green"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Test WebSocket Button */}
        {isConnected && (
          <div className="mb-4">
            <button 
              onClick={sendTestMessage}
              className="nav-button nav-button-green mr-2"
            >
              Send Test Message
            </button>
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
