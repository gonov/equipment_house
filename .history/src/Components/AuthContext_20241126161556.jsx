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
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('role');
    Cookies.remove('username');
  };

  // Проверяем роль и возвращаем Promise
  const checkAuth = () => {
    const role = Cookies.get('role');
    if (role === 'ADMIN') {
      return Promise.resolve(); // Разрешаем доступ, если роль ADMIN
    }else{
    // Отклоняем, если роль не ADMIN
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
