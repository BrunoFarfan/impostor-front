import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RevealScreen = () => {
  const { revealResult, advancePhase } = useGame();

  return (
    <Layout className="reveal-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Resultado de la votación
        </h1>
        
        {revealResult ? (
          <div className="reveal-result-container">
            <div className="reveal-card">
              <h2 className="reveal-title">Jugador eliminado</h2>
              
              <div className="reveal-player-info">
                <div className="reveal-player-name">
                  {revealResult.eliminated_player_name}
                </div>
                <div className="reveal-player-role">
                  Rol: <span className="reveal-role-text">
                    {revealResult.eliminated_player_role}
                  </span>
                </div>
              </div>

              {revealResult.eliminated_player_role === 'impostor' ? (
                <div className="reveal-outcome victory">
                  <p className="reveal-outcome-text victory">
                    🎉 Un impostor fue eliminado!
                  </p>
                </div>
              ) : (
                <div className="reveal-outcome defeat">
                  <p className="reveal-outcome-text defeat">
                    💀 Un pibe fue eliminado...
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <p className="screen-subtitle text-indigo-100">
              Contando votos...
            </p>
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Debug button - can be removed later */}
        {/* <button 
          onClick={advancePhase}
          className="nav-button nav-button-gray mt-4"
        >
          Next
        </button> */}
      </div>
    </Layout>
  );
};

export default RevealScreen;
