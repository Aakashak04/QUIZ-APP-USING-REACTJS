import React, { useState } from 'react';
import '../Login.css'; 

const Login = ({ onLogin, onRegister, isRegistering }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (username === storedUsername && password === storedPassword) {
      onLogin(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    onRegister();
    alert('Registration successful! Please log in.');
  };

  return (
    <div className="login-container">
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;
