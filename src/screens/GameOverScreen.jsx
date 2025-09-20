import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const GameOverScreen = () => {
  const { gameResults, playerRole, resetGame } = useGame();

  // Determine if the current player won
  const isWinner = gameResults && (
    (gameResults.winner === 'normal' && playerRole === 'normal') ||
    (gameResults.winner === 'impostor' && playerRole === 'impostor')
  );

  return (
    <Layout className="game-over-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Game Over
        </h1>
        
        {gameResults ? (
          <div className="mb-8">
            {/* Winner Announcement */}
            <div className={`p-8 rounded-lg mb-6 ${
              gameResults.winner === 'normal' 
                ? 'bg-blue-600 bg-opacity-50' 
                : 'bg-red-600 bg-opacity-50'
            }`}>
              <h2 className="text-4xl font-bold text-white mb-4">
                {gameResults.winner === 'normal' ? '🛠️ Crew Wins!' : '🔥 Impostors Win!'}
              </h2>
              
              <p className="text-xl text-gray-200 mb-4">
                {gameResults.winner === 'normal' 
                  ? 'All impostors have been eliminated!' 
                  : 'The impostors have taken control!'}
              </p>
            </div>

            {/* Personal Result */}
            <div className={`p-6 rounded-lg mb-6 ${
              isWinner 
                ? 'bg-green-600 bg-opacity-50 border-2 border-green-400' 
                : 'bg-gray-600 bg-opacity-50 border-2 border-gray-400'
            }`}>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isWinner ? '🎉 Victory!' : '💀 Defeat'}
              </h3>
              <p className="text-lg text-gray-200">
                You were a <span className="font-semibold capitalize">{playerRole}</span>
              </p>
              <p className="text-sm text-gray-300 mt-2">
                {isWinner 
                  ? 'Your team achieved victory!'
                  : 'Better luck next time!'}
              </p>
            </div>

            {/* Game Statistics */}
            {gameResults.statistics && (
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Game Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  {gameResults.statistics.total_rounds && (
                    <div>
                      <span className="font-medium">Rounds:</span> {gameResults.statistics.total_rounds}
                    </div>
                  )}
                  {gameResults.statistics.eliminations && (
                    <div>
                      <span className="font-medium">Eliminations:</span> {gameResults.statistics.eliminations}
                    </div>
                  )}
                  {gameResults.statistics.game_duration && (
                    <div>
                      <span className="font-medium">Duration:</span> {gameResults.statistics.game_duration}
                    </div>
                  )}
                  {gameResults.statistics.players_count && (
                    <div>
                      <span className="font-medium">Players:</span> {gameResults.statistics.players_count}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Final Players Status */}
            {gameResults.final_players && gameResults.final_players.length > 0 && (
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Final Results</h3>
                <div className="space-y-2">
                  {gameResults.final_players.map((player, index) => (
                    <div 
                      key={player.id || index}
                      className={`flex justify-between items-center p-3 rounded ${
                        player.alive ? 'bg-green-700 bg-opacity-50' : 'bg-red-700 bg-opacity-50'
                      }`}
                    >
                      <div>
                        <span className="font-medium text-white">{player.name}</span>
                        <span className="text-sm text-gray-300 ml-2 capitalize">({player.role})</span>
                      </div>
                      <div className="text-sm">
                        {player.alive ? (
                          <span className="text-green-300">🟢 Survived</span>
                        ) : (
                          <span className="text-red-300">💀 Eliminated</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="screen-subtitle text-gray-300 mb-8">
            The game has ended
          </p>
        )}

        <button 
          onClick={resetGame}
          className="nav-button nav-button-gray"
        >
          Play Again
        </button>
      </div>
    </Layout>
  );
};

export default GameOverScreen;
