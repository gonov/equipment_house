// authProvider.js
import axios from 'axios';
import Cookies from 'js-cookie';

import serverConfig from '../../../../../serverConfig';

const authProvider = {
  // Метод входа в систему
  login: async ({ username, password }) => {
    console.log('Attempting login:', username);
    try {
      const response = await axios.post(
        `${serverConfig}/auth/login`,
        { login: дщп, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, role } = response.data; // Предполагаем, что сервер возвращает роль
      Cookies.set('token', token, { expires: 10 }); // Сохраняем токен в cookies
      Cookies.set('role', role, { expires: 10 }); // Сохраняем роль в cookies

      if (role !== 'ADMIN') {
        // Если роль не администратор, отклоняем вход
        Cookies.remove('token');
        Cookies.remove('role');
        return Promise.reject(new Error('Access denied: Admins only.'));
      }

      return Promise.resolve();
    } catch (error) {
      console.error('Login error:', error);
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
    console.log('Checking auth:', { token, role });
    return token && role === 'ADMIN' ? Promise.resolve() : Promise.reject();
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
