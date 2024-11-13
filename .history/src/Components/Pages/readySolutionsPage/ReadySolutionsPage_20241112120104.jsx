import React from 'react';
import classes from './ReadySolutionsPage.module.css';
import { businessSolutions } from '../Bd';

function ReadySolutionsPage({ children, ...props }) {
  return (
    <>
    <CenterBlock>
    <WidthBlock>
      <div className={classes.container}>
        <span>Готовые решения для бизнеса</span>
        {businessSolutions.map((el) => (
          <div key={el.id} className={classes.containerBusinessCard}>
            <img src={el.img} alt="" />
            <span>{el.type}</span>
            <span>{el.title}</span>
            <span>{el.price}</span>
            <button>Подробнее</button>
          </div>
        ))}
      </div>
      </WidthBlock>
</CenterBlock>
    </>
  );
}

export default ReadySolutionsPage;


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
          onClick={() => navigate('/registration')}
        >
          {'    '} Зарегистрироваться
        </a>{' '}
      </p>
      <div className={classes.containerFormButton}>
        {/* <button>Назад</button> */}
        <button>Войти</button>
      </div>
    </div>
  </div>
</WidthBlock>
</CenterBlock>