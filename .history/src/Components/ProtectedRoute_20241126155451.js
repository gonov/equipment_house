// src/components/ProtectedRoute.js
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../'; // Используем контекст для получения auth

const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useAuth();

  // Проверяем авторизацию
  try {
    checkAuth(); // Если роль не ADMIN, это вызовет ошибку
  } catch (e) {
    return <Redirect to="/login" />; // Перенаправляем на страницу входа
  }

  return children; // Показываем компонент, если авторизация прошла
};

export default ProtectedRoute;
