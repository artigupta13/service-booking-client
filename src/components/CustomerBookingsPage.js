import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { getAllJobsByCustomer, deleteJob, updateJob } from "../services/jobApi"; // Assuming you have functions to fetch, cancel, and modify bookings

const CustomerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [modifiedAppointmentDate, setModifiedAppointmentDate] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await getAllJobsByCustomer();
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [bookings]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteJob(bookingId);
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleModifyBooking = (booking) => {
    setSelectedBooking(booking);
    setModifiedAppointmentDate(booking.appointmentDate);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Update the booking with modified details
      await updateJob(selectedBooking, {
        appointmentDate: modifiedAppointmentDate,
      });

      // Fetch updated list of bookings
      const updatedBookings = await getAllJobsByCustomer();
      setBookings(updatedBookings);

      // Close the dialog
      setOpenDialog(false);
    } catch (error) {
      console.error("Error modifying booking:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Customer Bookings
        </Typography>
        <Paper elevation={3}>
          <List>
            {bookings.map((booking) => (
              <ListItem key={booking._id} divider>
                <ListItemText
                  primary={booking.customerName}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        Job Type: {booking.jobType}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Status: {booking.status}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Appointment Date:{" "}
                        {new Date(booking.appointmentDate).toLocaleString()}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Technician: {booking.technician}
                      </Typography>
                    </>
                  }
                />
                <Button
                  variant="outlined"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleModifyBooking(booking._id)}
                >
                  Modify
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Modify Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Appointment Date"
            type="datetime-local"
            value={modifiedAppointmentDate}
            onChange={(e) => setModifiedAppointmentDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerBookingsPage;
