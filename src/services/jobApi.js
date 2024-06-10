import api from "./axiosConfig";

// Get all jobs
export const getAllJobs = async (filter) => {
  try {
    const response = await api.get("/api/Jobs", { params: filter });
    return response.data;
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    throw error;
  }
};

// Get all jobs by customer
export const getAllJobsByCustomer = async () => {
  try {
    const response = await api.get("/api/jobs/customer-jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    throw error;
  }
};

// Get a specific Job by ID
export const getJobById = async (id) => {
  try {
    const response = await api.get(`/api/Jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Job with ID ${id}:`, error);
    throw error;
  }
};

// Add a new Job
export const addJob = async (Job) => {
  try {
    const response = await api.post("/api/Jobs", Job);
    return response.data;
  } catch (error) {
    console.error("Error adding Job:", error);
    throw error;
  }
};

// Update an existing Job
export const updateJob = async (id, updatedJob) => {
  try {
    const response = await api.put(`/api/Jobs/${id}`, updatedJob);
    return response.data;
  } catch (error) {
    console.error(`Error updating Job with ID ${id}:`, error);
    throw error;
  }
};

// Delete a Job
export const deleteJob = async (id) => {
  try {
    await api.delete(`/api/Jobs/${id}`);
  } catch (error) {
    console.error(`Error deleting Job with ID ${id}:`, error);
    throw error;
  }
};
