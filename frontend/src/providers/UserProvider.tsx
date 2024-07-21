import React, { useState, useEffect } from 'react';
import UserContext, { User } from '../contexts/UserContext';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState<User>(() => ({
    role: localStorage.getItem('userRole'),
    token: localStorage.getItem('token'),
  }));

  // Update localStorage when user state changes
  useEffect(() => {
    if (user.token) {
      localStorage.setItem('token', user.token);
    } else {
      localStorage.removeItem('token');
    }
    if (user.role) {
      localStorage.setItem('userRole', user.role);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;