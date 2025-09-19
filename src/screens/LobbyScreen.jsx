import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const LobbyScreen = () => {
  const { 
    matchCode, 
    playerName,
    isConnected, 
    lastMessage, 
    error, 
    connectWebSocket, 
    sendTestMessage, 
    advancePhase 
  } = useGame();

  useEffect(() => {
    if (matchCode && !isConnected) {
      connectWebSocket();
    }
  }, [matchCode, isConnected, connectWebSocket]);

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

        <button 
          onClick={advancePhase}
          className="nav-button nav-button-green"
        >
          Assign Roles
        </button>
      </div>
    </Layout>
  );
};

export default LobbyScreen;
