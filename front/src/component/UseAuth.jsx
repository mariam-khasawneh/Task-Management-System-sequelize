import { useEffect, useState } from 'react';

const UseAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you might want to check token validity with an API call
      setIsAuthenticated(true); // Set to true if token exists
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};

export default UseAuth;
