import React, { useState } from "react";
import { Modal, Paper, Typography, TextField, Button } from "@mui/material";
import { addService } from "../services/serviceApi";

const AddServiceModal = ({ open, handleClose, setServices }) => {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    technician: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddService = () => {
    addService(newService)
      .then((response) => {
        setServices((prevServices) => [...prevServices, newService]);
        handleClose();
        setNewService({
          name: "",
          description: "",
          price: "",
          duration: "",
          technician: "",
        });
      })
      .catch((error) => {
        console.error("Error adding service", error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          padding: 2,
          margin: "auto",
          maxWidth: 400,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Service
        </Typography>
        <TextField
          fullWidth
          label="Service Name"
          name="name"
          variant="outlined"
          margin="normal"
          value={newService.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          margin="normal"
          value={newService.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          variant="outlined"
          margin="normal"
          value={newService.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Duration"
          name="duration"
          variant="outlined"
          margin="normal"
          value={newService.duration}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Technician"
          name="technician"
          variant="outlined"
          margin="normal"
          value={newService.technician}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddService}
          sx={{ mt: 2 }}
        >
          Add Service
        </Button>
      </Paper>
    </Modal>
  );
};

export default AddServiceModal;
