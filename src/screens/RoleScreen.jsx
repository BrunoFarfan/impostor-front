import React from 'react';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';

const RoleScreen = () => {
  const { playerRole, advancePhase } = useGame();

  const handleNext = () => {
    advancePhase();
  };

  return (
    <Layout className="role-screen">
      <div className="text-center">
        <h1 className="screen-title">
          Tu rol
        </h1>
        
        {playerRole ? (
          <div className="role-display-container">
            <div className="role-card">
              <h2 className="role-name">
                {playerRole}
              </h2>
              <p className="role-description">
                {playerRole === 'impostor' 
                  ? 'Intenta no ser descubierto!' 
                  : 'Describe a tu personaje, con un concepto cada ronda'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="role-waiting-container">
            <p className="screen-subtitle text-red-100">
              Esperando la asignación de rol...
            </p>
          </div>
        )}

        <button 
          onClick={handleNext}
          className="nav-button nav-button-red"
        >
          Iniciar ronda
        </button>
      </div>
    </Layout>
  );
};

export default RoleScreen;
