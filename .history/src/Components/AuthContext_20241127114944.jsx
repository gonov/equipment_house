import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get('token');
    console.log();
    
    if (token) {
      try {
        return jwtDecode(token); // Декодируем токен, если он существует
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  });

  const login = (token) => {
    try {
      const decoded = jwtDecode(token); // Декодируем токен
      setUser(decoded); // Сохраняем данные из токена
      Cookies.set('token', token, { expires: 10 }); // Сохраняем токен в куки
      console.log('User logged in:', decoded);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token'); // Удаляем токен из куки
  };

  const checkAuth = () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === 'ADMIN') {
          return Promise.resolve(); // Авторизация успешна
        }
      } catch (error) {
        console.error('Invalid token during auth check:', error);
      }
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
