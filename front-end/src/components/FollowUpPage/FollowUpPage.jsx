import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Paper
} from '@mui/material';
import './FollowUpPage.css';

const FollowUpPage = () => {
  const [email, setEmail] = useState('');
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        'https://my-crm-project.onrender.com/api/followup/send',
        { email, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.msg);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.msg : 'Error sending email');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="follow-up-container">
      <Paper elevation={4} className="follow-up-card">
        <Typography variant="h4" align="center" gutterBottom>
          Follow-Up Email
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="follow-up-form">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="follow-up-textfield"
          />
          <TextField
            label="Action"
            variant="outlined"
            fullWidth
            margin="normal"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            required
            className="follow-up-textfield"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            className="follow-up-button"
          >
            {loading ? <CircularProgress size={24} /> : 'Send Email'}
          </Button>
        </Box>

        {error && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setError(null)} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setSuccess(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setSuccess(null)} severity="success">
              {success}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Container>
  );
};

export default FollowUpPage;
