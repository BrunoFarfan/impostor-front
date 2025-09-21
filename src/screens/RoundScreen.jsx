import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RoundScreen = () => {
  const { 
    players, 
    playerId, 
    playerToggleVotingReadiness, 
    sendVotingReadiness, 
    isPlayerAlive,
    advancePhase,
    roundNumber
  } = useGame();

  const handleToggle = () => {
    const newVotingReadiness = !playerToggleVotingReadiness;
    sendVotingReadiness(newVotingReadiness);
  };

  const alivePlayersForStatus = players.filter(player => player.alive !== false);

  return (
    <Layout className="round-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Ronda {roundNumber}
        </h1>
        <p className="screen-subtitle text-yellow-100">
          Ronda en progreso...
        </p>

        {/* Players Status List - Only show alive players */}
        {alivePlayersForStatus.length > 0 && (
          <div className="players-status-container">
            <h2 className="players-status-title">Estado de los jugadores</h2>
            <div className="players-status-list">
              {alivePlayersForStatus.map((player, index) => (
                <div 
                  key={player.id || index} 
                  className={`player-status-item ${
                    player.id === playerId ? 'current' : 'other'
                  }`}
                >
                  <span className="player-status-name">{player.name}</span>
                  <div className="player-status-indicator">
                    <div className={`status-dot ${
                      player.ready_to_vote ? 'ready' : 'not-ready'
                    }`}></div>
                    <span className="status-text">
                      {player.ready_to_vote ? 'Listo' : 'No listo'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <div className="toggle-container">
          {isPlayerAlive() ? (
            <div className="toggle-wrapper">
              <label className="toggle-label">
                {/* <span className="toggle-text">Ready</span> */}
                <span className="toggle-text">
                  {playerToggleVotingReadiness ? 'Listo' : 'No listo'}
                </span>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={playerToggleVotingReadiness}
                      onChange={handleToggle}
                      className="sr-only"
                    />
                    <div className={`toggle-background ${
                      playerToggleVotingReadiness ? 'on' : 'off'
                    }`}>
                      <div className={`toggle-knob ${
                        playerToggleVotingReadiness ? 'on' : ''
                      }`}></div>
                    </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="eliminated-message">
              <div className="eliminated-card">
                <p className="eliminated-text">
                  💀 You have been eliminated
                </p>
                <p className="eliminated-subtext">
                  You can observe the game but cannot interact
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Debug button - can be removed later */}
        {/* <button 
          onClick={advancePhase}
          className="nav-button nav-button-yellow"
        >
          Start Voting (Debug)
        </button> */}
      </div>
    </Layout>
  );
};

export default RoundScreen;
