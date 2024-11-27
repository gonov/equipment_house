import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем токен при загрузке
    const token = Cookies.get('authToken') || localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          username: decodedToken.name,
          role: decodedToken.role,
        });
      } catch (error) {
        console.error('Invalid token:', error.message);
      }
    }
  }, []);

  const login = (username, role) => {
    setUser({ username, role });
    Cookies.set('authToken', 'your-encoded-token-here', { expires: 10 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('authToken');
  };

  const checkAuth = () => {
    if (user && user.role === 'ADMIN') {
      return Promise.resolve();
    }
    return Promise.reject('Access denied: Not an admin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
