import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const VotingScreen = () => {
  const { 
    players, 
    playerId, 
    selectedVote, 
    selectVote, 
    sendVote, 
    isPlayerAlive,
    advancePhase 
  } = useGame();

  const [hasVoted, setHasVoted] = useState(false);
  const [votedPlayerName, setVotedPlayerName] = useState('');

  // Get only alive players (exclude current player from voting options)
  const alivePlayersToVote = players.filter(player => 
    player.alive !== false && player.id !== playerId
  );

  const handlePlayerSelect = (targetPlayerId) => {
    if (!hasVoted) {
      selectVote(targetPlayerId);
    }
  };

  const handleVote = () => {
    if (selectedVote && !hasVoted) {
      const votedPlayer = alivePlayersToVote.find(p => p.id === selectedVote);
      setVotedPlayerName(votedPlayer?.name || 'Unknown');
      setHasVoted(true);
      sendVote();
    }
  };

  return (
    <Layout className="voting-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Fase de votación
        </h1>
        
        {isPlayerAlive() ? (
          hasVoted ? (
            /* Vote Confirmation Card */
            <>
              <p className="screen-subtitle text-purple-100">
                Tu voto ha sido emitido
              </p>

              <div className="vote-confirmation-container">
                <div className="vote-confirmation-card">
                  <h2 className="vote-confirmation-title">Voto emitido</h2>
                  <div className="vote-confirmation-player">
                    {votedPlayerName}
                  </div>
                  <p className="vote-confirmation-subtitle">
                    Esperando a que otros jugadores voten...
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Voting Interface */
            <>
              <p className="screen-subtitle text-purple-100">
                Vota para eliminar a un jugador
              </p>

              {/* Player Selection */}
              {alivePlayersToVote.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-6 text-purple-100">
                    Selecciona a un jugador para votar:
                  </h2>
                  <div className="voting-player-grid">
                    {alivePlayersToVote.map((player, index) => (
                      <button
                        key={player.id || index}
                        onClick={() => handlePlayerSelect(player.id)}
                        className={`voting-player-button ${
                          selectedVote === player.id ? 'selected' : 'selectable'
                        }`}
                      >
                        <div className="voting-player-name">{player.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Vote Button */}
              <div className="vote-selection">
                {/* {selectedVote && (
                  <p className="vote-selection-text">
                    Elegiste: <span className="vote-selection-name">
                      {alivePlayersToVote.find(p => p.id === selectedVote)?.name}
                    </span>
                  </p>
                )} */}
                <button 
                  onClick={handleVote}
                  disabled={!selectedVote}
                  className={`nav-button ${selectedVote ? 'nav-button-purple' : 'nav-button-gray'}`}
                >
                  Emitir voto
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <p className="screen-subtitle text-purple-100">
              Votación en progreso...
            </p>
            
            {/* Eliminated Player Message */}
            <div className="mb-8">
              <div className="eliminated-card">
                <p className="eliminated-text">
                  💀 Has sido eliminado
                </p>
                <p className="eliminated-subtext">
                  Puedes observar la votación pero no puedes participar
                </p>
              </div>
            </div>

            {/* Show alive players for observation */}
            {alivePlayersToVote.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6 text-purple-100">
                  Jugadores vivos:
                </h2>
                <div className="voting-player-grid">
                  {alivePlayersToVote.map((player, index) => (
                    <div
                      key={player.id || index}
                      className="voting-player-button observer"
                    >
                      <div className="voting-player-name">{player.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Debug button - can be removed later */}
        {/* <button 
          onClick={advancePhase}
          className="nav-button nav-button-gray"
        >
          Reveal Results (Debug)
        </button> */}
      </div>
    </Layout>
  );
};

export default VotingScreen;
