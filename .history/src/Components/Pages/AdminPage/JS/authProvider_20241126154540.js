// src/authProvider.js
import axios from 'axios';
import Cookies from 'js-cookie';

const authProvider = {
  login: async ({ login, password }) => {
    try {
      const response = await axios.post(
        '/auth/login',
        { login, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, role } = response.data;
      Cookies.set('token', token, { expires: 10 });
      Cookies.set('role', role, { expires: 10 });

      if (role !== 'ADMIN') {
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

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('role');
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    return token && role === 'ADMIN' ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      Cookies.remove('token');
      Cookies.remove('role');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = Cookies.get('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
