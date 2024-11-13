import React from 'react';
import classes from './BusSolCardDone.module.css';

function BusSolCardDone({ children, ...props }) {
  return (
    <>
      <div key={busSol.id} className={classes.containerBusinessCard}>
        <img src={busSol.img} alt="" />
        <span>{busSol.type ? 'В наличии' : 'Под заказ'}</span>
        <span>{busSol.title}</span>
        <span>{busSol.price} ₽</span>
        <button onClick={() => handleProductClick(busSol.id)}>
          Подробнее
        </button>{' '}
        {/* Добавлен обработчик клика */}
      </div>
    </>
  );
}

export default BusSolCardDone;
