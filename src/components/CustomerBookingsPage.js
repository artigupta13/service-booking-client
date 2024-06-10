import React, { useEffect, useState, useContext } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { getAllJobs, deleteJob, updateJob } from "../services/jobApi"; // Assuming you have functions to fetch, cancel, and modify bookings
import { UserContext } from "../contexts/UserContext";

const CustomerBookingsPage = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [modifiedAppointmentDate, setModifiedAppointmentDate] = useState("");
  const [modifiedStatus, setModifiedStatus] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const { email, role } = user;
          const filter = {};
          if (role === "customer") {
            filter.customerEmail = email;
          }
          const allBookings = await getAllJobs(filter);
          setBookings(allBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteJob(bookingId);
      const updatedBookings = bookings.filter(
        (booking) => booking._id !== bookingId
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleModifyBooking = (booking) => {
    setSelectedBooking(booking);
    setModifiedAppointmentDate(booking.appointmentDate);
    setModifiedStatus(booking.status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Update the booking with modified details
      await updateJob(selectedBooking._id, {
        appointmentDate: modifiedAppointmentDate,
        status: modifiedStatus ? modifiedStatus : selectedBooking.status, // Keep the status unchanged
      });

      // Fetch updated list of bookings
      const updatedBookings = await getAllJobs();
      setBookings(updatedBookings);

      // Close the dialog
      setOpenDialog(false);
    } catch (error) {
      console.error("Error modifying booking:", error);
    }
  };

  // Split the bookings into scheduled and completed
  const scheduledBookings = bookings.filter(
    (booking) => booking.status === "Scheduled"
  );
  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  );

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Customer Bookings
        </Typography>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h6">Scheduled Bookings</Typography>
            <List>
              {scheduledBookings.map((booking) => (
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
                  {user.role !== "customer" && (
                    <Button
                      variant="outlined"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => handleModifyBooking(booking)}
                  >
                    {user.role === "customer" ? "Change Date" : "Modify"}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ mt: 4 }}>
          <Box p={2}>
            <Typography variant="h6">Completed Bookings</Typography>
            <List>
              {completedBookings.map((booking) => (
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
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
      {selectedBooking && (
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
              inputProps={{ min: new Date().toISOString().slice(0, 16) }}
            />
            {user?.role === "admin" && (
              <Select
                label="Status"
                value={modifiedStatus}
                onChange={(e) => setModifiedStatus(e.target.value)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default CustomerBookingsPage;
