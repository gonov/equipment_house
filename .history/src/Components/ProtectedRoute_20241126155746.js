import React from 'react';
import { Navigate } from 'react-router-dom'; // Используем Navigate вместо Redirect
import { useAuth } from './AuthContext'; // Используем контекст для получения auth

const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useAuth();

  try {
    checkAuth(); // Проверяем, есть ли авторизация
  } catch (e) {
    return <Navigate to="/login" replace />; // Перенаправляем на страницу входа
  }

  return children; // Показываем компонент, если авторизация прошла
};

export default ProtectedRoute;
