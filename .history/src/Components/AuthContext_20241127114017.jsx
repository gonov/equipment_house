// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, role) => {
    setUser({ username, role });
    Cookies.set('role', role, { expires: 10 });
    Cookies.set('username', username, { expires: 10 });
    console.log('User logged in:', { username, role });
    console.log();
     // Логируем данные о пользователе
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('role');
    Cookies.remove('username');
  };

  const checkAuth = () => {
    const role = Cookies.get('role');
    console.log('Checking role from cookies:', role); // Логируем роль из cookies

    // Если роль не `ADMIN`, отклоняем доступ
    if (role === 'ADMIN') {
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
