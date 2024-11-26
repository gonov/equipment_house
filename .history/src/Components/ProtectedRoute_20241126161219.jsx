import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Для React Router v6
import { useAuth } from '../Components/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Состояние для проверки авторизации

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        await checkAuth();  // Ожидаем, что checkAuth выполнится успешно
        setIsAuthenticated(true); // Если прошли проверку
      } catch (error) {
        console.error('Authorization failed:', error); // Логируем ошибку, если проверка не пройдена
        setIsAuthenticated(false); // Если ошибка, значит не авторизован
      }
    };

    checkAuthorization(); // Выполняем проверку авторизации
  }, [checkAuth]);

  // Если проверка авторизации еще не завершена, показываем загрузку
  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Можно заменить на спиннер
  }

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; // Показываем компоненты, если авторизация прошла успешно
};

export default ProtectedRoute;
