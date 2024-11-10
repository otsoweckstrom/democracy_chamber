import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import '../styles/loginform.css';

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoint = isLogin
      ? `${process.env.REACT_APP_API_URL}/api/user/login`
      : `${process.env.REACT_APP_API_URL}/api/user/register`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isLogin) {
          console.log('Login successful:', data);
          setLoggedInUser({
            username: data.username,
            isAdmin: data.isAdmin,
            isPoller: data.isPoller,
          });
        } else {
          console.log('Registration successful:', data);
          setIsLogin(true); 
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred.'); // Provide a default error message
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <Paper elevation={3} className="login-form-container"> {/* Use Paper for visual separation */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
        }}
      >
        <Typography variant="h5" component="h2" align="center">
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setIsLogin(!isLogin)}
          fullWidth
        >
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;