import React, { useState } from 'react';
import { Button, Card, CardActions, TextField, CircularProgress } from '@mui/material';
import { useNotify, useRedirect } from 'react-admin';
import axios from 'axios';
import serverConfig from '../../../../serverConfig';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const login = form.login.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await axios.post(`${serverConfig}/auth/register`, {
        login,
        email,
        password,
      });

      notify('Регистрация успешна. Теперь вы можете войти.', { type: 'success' });
      redirect('/login');
    } catch (error) {
      notify(
        error.response?.data?.message || 'Ошибка при регистрации',
        { type: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '16px 24px', width: 300 }}>
            <TextField
              name="login"
              label="Имя пользователя"
              fullWidth
              margin="normal"
              autoFocus
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
            />
          </div>
          <CardActions>
            <Button type="submit" color="primary" disabled={loading} fullWidth>
              {loading ? <CircularProgress size={25} /> : 'Зарегистрироваться'}
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
