import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

// Custom hook to use the UserContext
const useUser = () => {
  const context = useContext(UserContext);
  
  // Throw an error if the hook is used outside of UserProvider
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};

export default useUser;