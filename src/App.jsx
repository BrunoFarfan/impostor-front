import React from 'react'
import { GameProvider } from './context/GameContext'
import GameFlow from './components/GameFlow'

function App() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  )
}

export default App
