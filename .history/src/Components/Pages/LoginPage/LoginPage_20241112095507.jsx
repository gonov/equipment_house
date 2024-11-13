import React from 'react';
import classes from './LoginPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ children, ...props }) {
  const navigate = useNavigate();

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <img src="/images/registr.png" alt="" />
            <span>Войти</span>
            <span>Введите свои данные для входа</span>
            <div className={classes.containerForm}>
              <input type="email" placeholder="E-mail" />
              <input type="password" placeholder="Введите пароль" />
              <p>
                Забыли пароль?{' '}
                <a
                  className={classes.containerFormLink}
onClick={}
>
                  {'    '} Зарегистрироваться
                </a>{' '}
              </p>
              <div className={classes.containerFormButton}>
                <button>Назад</button>
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default LoginPage;
