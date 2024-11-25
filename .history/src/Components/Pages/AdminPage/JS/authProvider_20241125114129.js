// authProvider.js
import axios from 'axios';
import Cookies from 'js-cookie';

import serverConfig from '../../../../../serverConfig';

const authProvider = {
  // Метод входа в систему
  login: async ({ username, password }) => {
    try {
      const response = await axios.post(
        `${serverConfig}/auth/login`,
        { login: username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token } = response.data;
      Cookies.set('token', token, { expires: 10 }); // Сохраняем токен в cookies

      // Проверка роли пользователя
      const userResponse = await axios.get(`${serverConfig}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { role } = userResponse.data;
      if (role !== 'ADMIN') {
        Cookies.remove('token');
        return Promise.reject(new Error('Access denied: Admins only.'));
      }

      Cookies.set('role', role); // Сохраняем роль в cookies (если нужно)
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Метод выхода из системы
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('role');
    return Promise.resolve();
  },

  // Метод проверки аутентификации
  checkAuth: () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    return token && role === 'admin' ? Promise.resolve() : Promise.reject();
  },

  // Метод проверки ошибок (например, истекший токен)
  checkError: (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      Cookies.remove('token');
      Cookies.remove('role');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Метод получения прав пользователя (например, роль)
  getPermissions: () => {
    const role = Cookies.get('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
