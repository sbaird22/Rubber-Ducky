import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/auth';

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
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Contains token and user info
    } catch (error) {
    console.error('Error during login:', error);
    throw error;
    }
};
