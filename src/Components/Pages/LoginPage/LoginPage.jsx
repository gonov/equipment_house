import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../AuthContext';
import classes from './LoginPage.module.css';
import serverConfig from '../../../../serverConfig';

function LoginPage() {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${serverConfig}/auth/login`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const { token } = response.data;

      Cookies.set('authToken', token, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });

      login(token);

      console.log('Успешная авторизация');
      navigate('/');
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      setError(
        err.response?.data?.message || 'Произошла ошибка. Попробуйте снова.'
      );
    }
  };

  return (
    <div className={classes.container}>
      <img src="/images/registr.png" alt="Логотип" />
      <span>Войти</span>
      <span>Введите свои данные для входа</span>
      <form onSubmit={handleSubmit} className={classes.containerForm}>
        <input
          type="text"
          name="login"
          placeholder=""
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className={classes.error}>{error}</p>}
        <p>
          Забыли пароль?{' '}
          <a
            className={classes.containerFormLink}
            onClick={() => navigate('/registration')}
          >
            Зарегистрироваться
          </a>
        </p>
        <div className={classes.containerFormButton}>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
