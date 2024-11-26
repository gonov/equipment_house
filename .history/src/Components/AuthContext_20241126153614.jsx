// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Состояние для пользователя (токен и роль)

  const login = (username, role) => {
    setUser({ username, role });
    Cookies.set('role', role, { expires: 10 });
    Cookies.set('username', username, { expires: 10 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('role');
    Cookies.remove('username');
  };

  const checkAuth = () => {
    const role = Cookies.get('role');
    if (role === 'ADMIN') {
      return Promise.resolve();
    }
    return Promise.reject();
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
