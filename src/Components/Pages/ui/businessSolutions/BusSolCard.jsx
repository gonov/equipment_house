import React from 'react';
import classes from './BusSol.module.css';

function BusSolCard({ busSol }) {
  return (
    <>
      <div className={classes.solContainer}>
        <img src="/images/image.png"></img>
        <div>{busSol.availability ? 'В наличии' : 'Под заказ'}</div>
        <div className={classes.shadow}>
          <span>{busSol.name}</span>
          <span>{busSol.price} ₽</span>
        </div>
      </div>
    </>
  );
}

export default BusSolCard;
