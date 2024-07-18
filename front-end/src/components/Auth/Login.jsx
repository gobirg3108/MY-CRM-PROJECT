import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import CustomSnackbar from './CustomSnackbar'; // Import your CustomSnackbar component
import './Login.css'; // Import your CSS file for custom styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://my-crm-project.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setSnackbarMessage('Login successful. Redirecting to dashboard...');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400 && err.response.data.msg === 'Invalid Credentials') {
        setSnackbarMessage('Invalid email or password. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else if (err.response && err.response.status === 400 && err.response.data.msg === 'Password does not match') {
        setSnackbarMessage('Password does not match. Please check your password.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage('Login failed. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="login-container">
        <Typography variant="h5" gutterBottom className="login-title">Login</Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             autoComplete="current-password"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">Login</Button>
        </form>
      </Paper>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default Login;