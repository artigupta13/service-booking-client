import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box mt={8}>
        <Typography component="h1" variant="h4" align="center">
          Login or Register
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <LoginForm />
              <Typography variant="body2" align="center">
                Don't have an account? <Link to="/register">Register here</Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <RegisterForm />
              <Typography variant="body2" align="center">
                Already have an account? <Link to="/">Login here</Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
