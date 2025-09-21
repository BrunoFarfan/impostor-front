import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const GameOverScreen = () => {
  const { gameResults, playerRole, resetGame } = useGame();

  // Determine if the current player won
  const isWinner = gameResults && (
    (gameResults.winner === 'normal' && playerRole !== 'impostor') ||
    (gameResults.winner === 'impostor' && playerRole === 'impostor')
  );

  return (
    <Layout className="game-over-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Game Over
        </h1>
        
        {gameResults ? (
          <div className="game-over-main-container">
            {/* Winner Announcement */}
            <div className={`winner-announcement ${
              gameResults.winner === 'normal' ? 'crew' : 'impostor'
            }`}>
              <h2 className="winner-title">
                {gameResults.winner === 'normal' ? '🛠️ Ganan los pibes!' : '🔥 Ganan los impostores!'}
              </h2>
              
              <p className="winner-description">
                {gameResults.winner === 'normal' 
                  ? 'Todos los impostores han sido eliminados!' 
                  : 'Los impostores son mayoría!'}
              </p>
            </div>

            {/* Personal Result */}
            <div className={`personal-result ${
              isWinner ? 'victory' : 'defeat'
            }`}>
              <h3 className="personal-result-title">
                {isWinner ? '🎉 Victoria!' : '💀 Derrota'}
              </h3>
              <p className="personal-result-role">
                Tu rol fue <span className="personal-result-role-text">{playerRole}</span>
              </p>
              <p className="personal-result-message">
                {isWinner 
                  ? 'Carreaste a tu equipo!'
                  : 'Equipo de fecas'}
              </p>
            </div>

            {/* Final Players Status */}
            {/* {gameResults.final_players && gameResults.final_players.length > 0 && (
              <div className="final-players-container">
                <h3 className="final-players-title">Final Results</h3>
                <div className="final-players-list">
                  {gameResults.final_players.map((player, index) => (
                    <div 
                      key={player.id || index}
                      className={`final-player-item ${
                        player.alive ? 'alive' : 'dead'
                      }`}
                    >
                      <div>
                        <span className="final-player-info">{player.name}</span>
                        <span className="final-player-role">({player.role})</span>
                      </div>
                      <div className={`final-player-status ${
                        player.alive ? 'alive' : 'dead'
                      }`}>
                        {player.alive ? '🟢 Survived' : '💀 Eliminated'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <p className="screen-subtitle text-gray-300 mb-8">
            El juego ha terminado
          </p>
        )}

        <button 
          onClick={resetGame}
          className="nav-button nav-button-gray"
        >
          Jugar de nuevo
        </button>
      </div>
    </Layout>
  );
};

export default GameOverScreen;
