import React, { useState } from 'react';
import classes from './LoginPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || 'Ошибка авторизации');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Сохранение токена в локальное хранилище
      navigate('/'); // Перенаправление на главную страницу
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          <img src="/images/registr.png" alt="Login" />
          <span>Войти</span>
          <span>Введите свои данные для входа</span>
          {error && <div className={classes.error}>{error}</div>}
          <form className={classes.containerForm} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p>
              Забыли пароль?{' '}
              <Link to="/registration" className={classes.containerFormLink}>
                Зарегистрироваться
              </Link>
            </p>
            <div className={classes.containerFormButton}>
              <button type="submit">Войти</button>
            </div>
          </form>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default LoginPage;
