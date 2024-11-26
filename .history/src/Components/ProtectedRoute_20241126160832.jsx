// src/Components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Для React Router v6
import { useAuth } from '../contexts/AuthContext'; // Контекст авторизации

const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        await checkAuth(); // Проверяем авторизацию
        setIsAuthenticated(true);  // Если прошли авторизацию
      } catch (error) {
        setIsAuthenticated(false);  // Если ошибка (например, роль не ADMIN)
      }
    };

    checkAuthorization(); // Вызываем функцию для проверки авторизации
  }, [checkAuth]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Можно добавить спиннер или лоадер
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Перенаправляем на страницу входа
  }

  return children; // Показываем компонент, если авторизация прошла успешно
};

export default ProtectedRoute;
