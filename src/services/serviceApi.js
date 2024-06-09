

import api from './axiosConfig';


// Get all services
export const getAllServices = async () => {
    try {
        const response = await api.get('/api/services');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Get a specific service by ID
export const getServiceById = async (id) => {
    try {
        const response = await api.get(`/api/services/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching service with ID ${id}:`, error);
        throw error;
    }
};

// Add a new service
export const addService = async (service) => {
    try {
        const response = await api.post('/api/services', service);
        return response.data;
    } catch (error) {
        console.error('Error adding service:', error);
        throw error;
    }
};

// Update an existing service
export const updateService = async (id, updatedService) => {
    try {
        const response = await api.put(`/api/services/${id}`, updatedService);
        return response.data;
    } catch (error) {
        console.error(`Error updating service with ID ${id}:`, error);
        throw error;
    }
};

// Delete a service
export const deleteService = async (id) => {
    try {
        await api.delete(`/api/services/${id}`);
    } catch (error) {
        console.error(`Error deleting service with ID ${id}:`, error);
        throw error;
    }
};
