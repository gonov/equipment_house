import React from 'react';
import classes from './BusSolCardDone.module.css';

function BusSolCardDone({ children, ...props }) {
  return (
    <>
      <div key={busSol.id} className={classes.containerBusinessCard}>
        <img src={el.img} alt="" />
        <span>{el.type ? 'В наличии' : 'Под заказ'}</span>
        <span>{el.title}</span>
        <span>{el.price} ₽</span>
        <button onClick={() => handleProductClick(el.id)}>
          Подробнее
        </button>{' '}
        {/* Добавлен обработчик клика */}
      </div>
    </>
  );
}

export default BusSolCardDone;
