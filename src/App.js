// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/quiz';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setShowButtons(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setShowButtons(false);
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
    setShowButtons(false);
  };

  const handleRegister = () => {
    setIsRegistering(false);
    setShowButtons(true);
  };

  return (
    <div id="app-container">
      <header>
        <h1>Quiz App</h1>
      </header>
      {isLoggedIn ? (
        <Quiz />
      ) : (
        <div>
          {showButtons ? (
            <div className="auth-buttons">
              <button onClick={handleLoginClick}>Login</button>
              <button onClick={handleRegisterClick}>Register</button>
            </div>
          ) : (
            <Login onLogin={handleLogin} onRegister={handleRegister} isRegistering={isRegistering} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
