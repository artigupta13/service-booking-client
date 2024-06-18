import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const user = { username, email, password, role };

    try {
      const response = await axios.post('/auth/register', user);
      console.log('Registered successfully:', response.data);
      setSuccessMessage('Registered successfully! Please log in.'); // Set success message
      setError(null); // Clear any previous errors
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Navigate to login page after 2 seconds
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
      console.error('Error:', error);
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
    </Box>
  );
};

export default RegisterForm;
