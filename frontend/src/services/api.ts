import axios, { AxiosError } from 'axios';
import { Profile } from '../types';

// Define the base URL for API requests
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Define the structure of API responses
interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

// Define the structure of the login response
interface LoginResponse {
  token: string;
  role: string;
}

// Define the structure of a staff member
interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  email: string;
}

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Function to set the authentication token in the request headers
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Function to handle login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error in login:', error);
    handleApiError(error);
    throw error;
  }
};

// Function to handle registration
export const register = async (username: string, password: string, role: string): Promise<void> => {
  try {
    await api.post<ApiResponse>('/auth/register', { username, password, role });
  } catch (error) {
    console.error('Error in register:', error);
    handleApiError(error);
    throw error;
  }
};

// Function to get staff members
export const getStaffMembers = async (page: number = 1, limit: number = 10): Promise<{ data: StaffMember[], total: number }> => {
  try {
    const response = await api.get<ApiResponse<{ data: StaffMember[], total: number }>>(`/staff?page=${page}&limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error in getStaffMembers:', error);
    handleApiError(error);
    throw error;
  }
};

// Function to get all profiles
export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const response = await api.get<ApiResponse<Profile[]>>('/profiles');
    return response.data.data;
  } catch (error) {
    console.error('Error in getProfiles:', error);
    handleApiError(error);
    throw error;
  }
};

// Function to create a new profile
export const createProfile = async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
  try {
    console.log('Sending create profile request with data:', profile); // Debug log
    const response = await api.post<ApiResponse<Profile>>('/profiles', profile);
    console.log('Create profile response:', response.data); // Debug log
    return response.data.data;
  } catch (error) {
    console.error('Error in createProfile:', error);
    handleApiError(error);
    throw error;
  }
};

// Function to update an existing profile
export const updateProfile = async (id: number, profile: Partial<Profile>): Promise<Profile> => {
  try {
    const response = await api.put<ApiResponse<Profile>>(`/profiles/${id}`, profile);
    return response.data.data;
  } catch (error) {
    console.error('Error in updateProfile:', error);
    handleApiError(error);
    throw error;
  }
};

// Function to delete a profile
export const deleteProfile = async (id: number): Promise<void> => {
  try {
    await api.delete(`/profiles/${id}`);
  } catch (error) {
    console.error('Error in deleteProfile:', error);
    handleApiError(error);
    throw error;
  }
};

// Helper function to handle API errors
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      console.error('API Error Response:', axiosError.response.data);
      console.error('API Error Status:', axiosError.response.status);
      console.error('API Error Headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      console.error('API Error Request:', axiosError.request);
    } else {
      console.error('API Error Message:', axiosError.message);
    }
  } else {
    console.error('Unexpected error:', error);
  }
};

export default api;