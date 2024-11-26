import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useAuth();

  try {
    checkAuth(); // Проверка, прошел ли пользователь аутентификацию
  } catch (e) {
    console.error(e); // Логируем ошибку для отладки
    return <Navigate to="/login" replace />; // Перенаправление на страницу входа
  }

  return children; // Показываем компоненты, если авторизация прошла успешно
};

export default ProtectedRoute;
