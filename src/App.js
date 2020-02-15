import React from 'react';
import Sudoku from './components/sudoku/sudoku'
import './App.css';

function App() {

  
  
  return (
    <div className="App" >
      <h1>Sudoku Solver</h1>
      <Sudoku className="mainSudoku"></Sudoku >
      
    </div>
  );
}

export default App;
