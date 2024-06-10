import React, { useState, useContext } from "react";
import { addJob } from "../services/jobApi";
import { Typography, TextField, Button, Box, Paper, Alert } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

const ServiceDetails = ({ service }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useContext(UserContext);

  const handleBooking = () => {
    addJob({
      serviceId: service._id,
      customerName: user.username,
      customerEmail: user.email,
      jobType: service.name,
      status: "Scheduled",
      appointmentDate,
      technician: service.technician,
    })
      .then((response) => {
        setSuccessMessage("Booking successful!");
        setAppointmentDate("");
      })
      .catch((error) => {
        console.error("Error booking service", error);
      });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Service Details
      </Typography>
      <Typography variant="body1">
        <strong>Name:</strong> {service.name}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {service.description}
      </Typography>
      <Typography variant="body1">
        <strong>Price:</strong> {service.price}
      </Typography>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Book Service
        </Typography>
        <TextField
          fullWidth
          label="Appointment Date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
          value={appointmentDate}
          inputProps={{ min: new Date().toISOString().slice(0, 16) }}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBooking}
          sx={{ mt: 2 }}
        >
          Book
        </Button>
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default ServiceDetails;
