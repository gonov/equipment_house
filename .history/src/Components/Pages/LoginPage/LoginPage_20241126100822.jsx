import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './LoginPage.module.css';

function LoginPage() {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      const response = await axios.post(``, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token } = response.data;

      // Сохраняем токен (например, в localStorage или context)
      localStorage.setItem('authToken', token);

      console.log('Успешная авторизация');
      navigate('/'); // Перенаправление на страницу после успешного входа
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      setError('Неверный login или пароль');
    }
  };

  return (
    <div className={classes.container}>
      <img src="/images/registr.png" alt="" />
      <span>Войти</span>
      <span>Введите свои данные для входа</span>
      <form onSubmit={handleSubmit} className={classes.containerForm}>
        <input
          type="text"
          name="login"
          placeholder="Login"
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
