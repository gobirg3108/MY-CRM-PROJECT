import React from 'react';
import { Container, Typography } from '@mui/material';
import './FooterStyles.css'; // Importing the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Typography variant="body1" className="footer-text">© 2024 CRM Application. All rights reserved.</Typography>
      </Container>
    </footer>
  );
};

export default Footer;