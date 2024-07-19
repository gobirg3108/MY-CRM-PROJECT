import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container,Typography,Table,TableContainer,TableHead,TableBody,TableRow,TableCell,Paper,CircularProgress} from '@mui/material';
import './Reports.css'; // Import your CSS file for custom styles

const Reports = () => {
  const [leadConversionRates, setLeadConversionRates] = useState([]);
  const [salesPerformance, setSalesPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const res = await axios.get('https://my-crm-project.onrender.com/api/reports', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeadConversionRates(res.data.leadConversionRates);
        setSalesPerformance(res.data.salesPerformance);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <Container className="reports-container">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="reports-container">
        <Typography variant="h6" color="error">
        Access Denied.{error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="reports-container" maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      {/* Lead Conversion Rates Table */}
      <Typography variant="h5" gutterBottom>
        Lead Conversion Rates
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadConversionRates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>No data available</TableCell>
              </TableRow>
            ) : (
              leadConversionRates.map((rate) => (
                <TableRow key={rate._id}>
                  <TableCell>{rate._id}</TableCell>
                  <TableCell>{rate.count}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sales Performance Table */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
        Sales Performance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesPerformance.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            ) : (
              salesPerformance.map((performance) => (
                <TableRow key={`${performance._id.month}-${performance._id.year}`}>
                  <TableCell>{performance._id.month}</TableCell>
                  <TableCell>{performance._id.year}</TableCell>
                  <TableCell>{performance.count}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Reports;
