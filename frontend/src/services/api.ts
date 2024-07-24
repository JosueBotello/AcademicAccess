import axios, { AxiosError } from 'axios';

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

const api = axios.create({
  baseURL: API_URL,
});

// Authentication functions
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.message || 'An error occurred during login');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

// Registration function
export const register = async (username: string, password: string, role: string): Promise<void> => {
  try {
    await api.post<ApiResponse>('/auth/register', { username, password, role });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.message || 'An error occurred during registration');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

// Function to get staff members
export const getStaffMembers = async (page: number = 1, limit: number = 10): Promise<{ data: StaffMember[], total: number }> => {
  try {
    const response = await api.get<ApiResponse<{ data: StaffMember[], total: number }>>(`/staff?page=${page}&limit=${limit}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.message || 'An error occurred while fetching staff members');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

export default api;