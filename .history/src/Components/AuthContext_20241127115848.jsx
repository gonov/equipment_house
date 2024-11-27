import React, { createContext, useState, useContext, useCallback } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback((token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser({ username: decodedToken.username, role: decodedToken.role });
      Cookies.set('authToken', token, { expires: 7 });
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove('authToken');
  }, []);

  const checkAuth = useCallback(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      return Promise.reject('No token found');
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === 'ADMIN') {
        setUser({ username: decodedToken.username, role: decodedToken.role });
        return Promise.resolve();
      }
      return Promise.reject('Access denied: Not an admin');
    } catch (error) {
      console.error('Error decoding token:', error);
      return Promise.reject('Invalid token');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
