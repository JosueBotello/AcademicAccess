import React from 'react';

// Define the shape of our user object
export interface User {
  role: string | null;
  token: string | null;
}

// Define the shape of our context
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create the context with a default value
const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default UserContext;