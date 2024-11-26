import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './LoginPage.module.css';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const response = await axios.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token } = response.data;

      // Сохраняем токен (например, в localStorage или context)
      localStorage.setItem('authToken', token);

      console.log('Успешная авторизация');
      navigate('/'); // Перенаправление на страницу после успешного входа
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.center_block}>
        <h1>Авторизация</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.form_group}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш e-mail"
              required
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите ваш пароль"
              required
            />
          </div>
          {error && <p className={classes.error}>{error}</p>}
          <button type="submit" className={classes.submit_button}>
            Войти
          </button>
        </form>
        <p>
          Забыли пароль?{' '}
          <a onClick={() => navigate('/registration')} className={classes.link}>
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
