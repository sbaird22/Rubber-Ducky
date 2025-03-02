import axios from 'axios';

const API_BASE_URL = '/api/auth';

export const registerUser = async (username: string, email: string, password: string) => {
    try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
    return response.data; // Contains token and user info
    } catch (error) {
    console.error('Error during registration:', error);
    throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
      // Send login request to the backend
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      
      // Return the response data containing token and user info
      return response.data;
    } catch (error: any) {
      // If error response is available, use it; otherwise, use a generic message
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred during login';
  
      console.error('Error during login:', errorMessage);  // Log the error message
  
      // Rethrow the error to handle it on the calling side
      throw new Error(errorMessage);
    }
  };