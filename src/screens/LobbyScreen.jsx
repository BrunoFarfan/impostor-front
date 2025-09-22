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
          Lobby
        </h1>
        <div>
          <div className="screen-subtitle text-green-100">
            Player: {playerName}
            <br />
            Código de la partida: <b>{matchCode}</b>
            <button
              onClick={() => navigator.clipboard.writeText(matchCode)}
              title="Copy code"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#10b981',
                fontSize: '1em',
                padding: 0,
                lineHeight: 1
              }}
              aria-label="Copy match code"
            >
              📋
            </button>
          </div>
        </div>

        {/* WebSocket Connection Status */}
        <div className="mb-4">
          <div className={`connection-status ${
            isConnected ? 'connected' : 'disconnected'
          }`}>
            {isConnected ? 'Conectado' : 'Desconectado'}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-display">
            {error}
          </div>
        )}

        {/* Players List */}
        {players.length > 0 && (
          <div className="players-list-container">
            <h2 className="players-list-title">Jugadores en el Lobby</h2>
            <div className="players-list">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className={`player-item ${
                    player.id === playerId ? 'current-player' : 'other-player'
                  }`}
                >
                  <span className="player-name">{player.name}</span>
                  {player.host && (
                    <span className="host-badge">HOST</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Role Proposition */}
        {isConnected && (
          <div className="role-proposition-container">
            <div className="role-proposition-form">
              <input
                type="text"
                value={roleProposition}
                onChange={(e) => setRoleProposition(e.target.value)}
                placeholder="Introduce una sugerencia de rol"
                className="role-input"
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
                Enviar Propuesta
              </button>
            </div>
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
              Iniciar Juego
            </button>
            {!canStart && (
              <div className="text-red-200 mt-2 text-sm">
                Se necesita al menos una propuesta de rol
              </div>
            )}
          </div>
        )}

        {/* Refresh Button */}
        {isConnected && (
          <div className="mb-4">
            <button 
              onClick={() => refreshMatchState()}
              className="nav-button nav-button-blue mr-2"
            >
              Actualizar
            </button>
          </div>
        )}

        {/* Last Message Display */}
        {/* {lastMessage && (
          <div className="message-display">
            <strong>Last Message:</strong> {JSON.stringify(lastMessage)}
          </div>
        )} */}
      </div>
    </Layout>
  );
};

export default LobbyScreen;
