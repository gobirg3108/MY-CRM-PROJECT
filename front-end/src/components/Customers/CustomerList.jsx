import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { jwtDecode } from "jwt-decode";

import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    source: '',
    status: '',
    purchaseHistory: '',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const res = await axios.get('https://my-crm-project.onrender.com/api/customers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomers(res.data);

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.user.role;
        setIsAdmin(userRole === 'admin');
      } catch (err) {
        console.error('Error fetching customers:', err.response ? err.response.data : err.message);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`https://my-crm-project.onrender.com/api/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(customers.filter((customer) => customer._id !== customerId));
    } catch (err) {
      console.error('Error deleting customer:', err.response ? err.response.data : err.message);
    }
  };

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      source: customer.source,
      status: customer.status,
      purchaseHistory: customer.purchaseHistory,
    });
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setCurrentCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      source: '',
      status: '',
      purchaseHistory: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const updatedCustomer = { ...currentCustomer, ...formData };

      const res = await axios.put(`https://my-crm-project.onrender.com/api/customers/${currentCustomer._id}`, updatedCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCustomers = customers.map((customer) =>
        customer._id === res.data._id ? res.data : customer
      );
      setCustomers(updatedCustomers);

      handleCloseEdit();
    } catch (err) {
      console.error('Error updating customer:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Container className="customer-list-container">
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        Customer List
      </Typography>
      <TableContainer component={Paper}>
        <Table className="customer-list-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Purchase History</TableCell>
              {isAdmin && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 8 : 7} className="empty-message">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.source}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell>{customer.purchaseHistory}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditCustomer(customer)}
                        sx={{ mr: 1, px: 2, py: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteCustomer(customer._id)}
                        sx={{ mr: 1, px: 2, py: 1 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editMode} onClose={handleCloseEdit}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="source"
            label="Source"
            type="text"
            fullWidth
            value={formData.source}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="purchaseHistory"
            label="Purchase History"
            type="text"
            fullWidth
            value={formData.purchaseHistory}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerList;
