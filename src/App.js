import React, { useState } from 'react';
import './App.css';
import Quiz from './components/quiz';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div id="app-container">
      <header>
        <h1>Quiz App</h1>
      </header>
      {isLoggedIn ? (
        <Quiz />
      ) : (
        <Login onLogin={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
