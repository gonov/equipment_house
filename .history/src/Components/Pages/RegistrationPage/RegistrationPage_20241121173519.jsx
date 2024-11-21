import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './RegistrationPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import serverConfig from '../../../../serverConfig';

function RegistrationPage({ children, ...props }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${serverConfig}/auth/register`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('Registration successful:', response.data);
      alert('Регистрация прошла успешно!');
      navigate('/login'); // Перенаправление на страницу входа
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          <img src="/images/registr.png" alt="" />
          <span>Регистрация</span>
          <span>Заполните все поля для регистрации</span>
          <form onSubmit={handleSubmit} className={classes.containerForm}>
            <input
              type="text"
              name="name"
              placeholder="ФИО"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.login}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
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

            <p>
              Нажимая на кнопку "Отправить", я даю согласие на{' '}
              <a
                className={classes.containerFormLink}
                href="https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85"
                target="_blank"
                rel="noopener noreferrer"
              >
                обработку моих персональных данных.
              </a>
            </p>
            {error && <p className={classes.error}>{error}</p>}
            <div className={classes.containerFormButton}>
              <button type="button" onClick={() => navigate(-1)}>
                Назад
              </button>
              <button type="submit" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default RegistrationPage;
