import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import './HomeStyles.css'; // Importing the CSS file

const Home = () => {
  return (
    <Container className="homeContainer">
      <Paper className="homePaper" elevation={3}>
        <Typography variant="h3" className="welcomeText" gutterBottom>Welcome to the CRM Application</Typography>
        <Typography variant="h6" className="homeSubtitle" gutterBottom>
          Manage your customer relationships efficiently and effectively.
        </Typography>
        <Box className="homeButtons">
          <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
          <Button variant="contained" color="secondary" component={Link} to="/register">Register</Button>
        </Box>
      </Paper>
      <Box className="homeContent">
        <Typography variant="h5" gutterBottom>Why Choose Our CRM?</Typography>
        <Typography variant="body1" gutterBottom>
          Our CRM application is designed to help you manage your customer interactions and data in an organized and efficient manner. 
          With features like customer tracking, sales automation, and detailed reporting, you can ensure that your business runs smoothly and your customers are satisfied.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;