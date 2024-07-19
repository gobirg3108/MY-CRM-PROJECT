import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import './CustomerForm.css';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.user.role;
        setIsAdmin(userRole === 'admin');
      } catch (err) {
        console.error('Error checking admin status:', err.response ? err.response.data : err.message);
        navigate('/login');
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const newCustomer = {
        name,
        email,
        phone,
        address,
        source,
        status,
        purchaseHistory,
      };

      await axios.post('https://my-crm-project.onrender.com/api/customers', newCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating customer:', err.response ? err.response.data : err.message);
    }
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="sm" className="access-denied-container">
        <Paper elevation={3} className="form-container">
          <Typography variant="h6" align="center" className="access-denied-text">
            Access Denied. Only admins can add new customers.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" align="center" gutterBottom>
          Add New Customer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Your Name'
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Your E-Mail ID'
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Enter Your Mob No'
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter Your Address'
          />
          <TextField
            label="Source"
            fullWidth
            margin="normal"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder='Ex: Website'
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder='Ex: New,Contacted,Interested,Converted'
          />
          <TextField
            label="Purchase History"
            fullWidth
            margin="normal"
            value={purchaseHistory}
            onChange={(e) => setPurchaseHistory(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Customer
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerForm;
