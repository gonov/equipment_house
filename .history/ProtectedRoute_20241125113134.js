import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Или используйте другой метод хранения токенов

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = Cookies.get('token'); // Получаем токен
  const userRole = token ? parseJwt(token).role : null; // Парсим токен, чтобы получить роль

  if (!token || userRole !== requiredRole) {
    return <Navigate to="/" />; // Перенаправление на главную страницу, если нет доступа
  }

  return children; // Если проверка прошла, рендерим содержимое
};

// Функция для парсинга JWT токена
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export default ProtectedRoute;
