import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser({ username: decodedToken.username, role: decodedToken.role });
      Cookies.set('token', token, { expires: 10 });
      console.log('User logged in:', decodedToken); // Логируем данные о пользователе
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
  };

  const checkAuth = () => {
    const token = Cookies.get('token');
    if (!token) {
      return Promise.reject('No token found');
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken); // Логируем декодированный токен

      // Проверяем, что пользователь является админом
      if (decodedToken.role === 'ADMIN') {
        setUser({ username: decodedToken.username, role: decodedToken.role });
        return Promise.resolve();
      } else {
        return Promise.reject('Access denied: Not an admin');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return Promise.reject('Invalid token');
    }
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
