import React, { useEffect, useState, useContext } from 'react';
import { getAllServices } from '../services/serviceApi';
import ServiceDetails from './ServiceDetails';
import AddServiceModal from './AddServiceModal';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getAllServices();
        setServices(services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container component="main" maxWidth="lg">
      <Box mt={4}>
        <Typography component="h1" variant="h4" align="center">
          Service List
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <List>
                {services.map(service => (
                  <ListItem key={service._id} disablePadding>
                    <ListItemButton onClick={() => setSelectedService(service)}>
                      <ListItemText
                        primary={service.name}
                        secondary={service.description}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {selectedService && (
              <Paper elevation={3} style={{ padding: '16px' }}>
                <ServiceDetails service={selectedService} />
              </Paper>
            )}
          </Grid>
        </Grid>
        {user && user.role === 'admin' && (
          <Box mt={4} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add New Service
            </Button>
          </Box>
        )}
      </Box>
      <AddServiceModal open={open} handleClose={handleClose} setServices={setServices} />
    </Container>
  );
};

export default ServiceList;
