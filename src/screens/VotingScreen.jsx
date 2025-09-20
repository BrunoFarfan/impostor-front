import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const VotingScreen = () => {
  const { 
    players, 
    playerId, 
    selectedVote, 
    selectVote, 
    sendVote, 
    advancePhase 
  } = useGame();

  // Get only alive players (exclude current player from voting options)
  const alivePlayersToVote = players.filter(player => 
    player.alive !== false && player.id !== playerId
  );

  const handlePlayerSelect = (targetPlayerId) => {
    selectVote(targetPlayerId);
  };

  const handleVote = () => {
    sendVote();
  };

  return (
    <Layout className="voting-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Voting Phase
        </h1>
        <p className="screen-subtitle text-purple-100">
          Vote to eliminate a player
        </p>

        {/* Player Selection */}
        {alivePlayersToVote.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-purple-100">Select a player to vote out:</h2>
            <div className="flex flex-wrap justify-center md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {alivePlayersToVote.map((player, index) => (
                <button
                  key={player.id || index}
                  onClick={() => handlePlayerSelect(player.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedVote === player.id
                      ? 'bg-purple-600 border-purple-400 text-white transform scale-105'
                      : 'bg-purple-800 bg-opacity-50 border-purple-600 text-purple-100 hover:bg-purple-700 hover:bg-opacity-70'
                  }`}
                >
                  <div className="font-semibold text-lg">{player.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vote Button */}
        {selectedVote && (
          <div className="mb-6">
            <p className="text-purple-200 mb-4">
              You selected: <span className="font-bold text-white">
                {alivePlayersToVote.find(p => p.id === selectedVote)?.name}
              </span>
            </p>
            <button 
              onClick={handleVote}
              className="nav-button nav-button-purple"
            >
              Cast Vote
            </button>
          </div>
        )}

        {/* Debug button - can be removed later */}
        <button 
          onClick={advancePhase}
          className="nav-button nav-button-gray"
        >
          Reveal Results (Debug)
        </button>
      </div>
    </Layout>
  );
};

export default VotingScreen;
