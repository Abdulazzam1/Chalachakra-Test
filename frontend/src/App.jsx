import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: 'white', fontSize: '48px', fontWeight: '700' }}>
        Simple Task Management Board
      </h1>
      <Board />
    </div>
  );
}

export default App;