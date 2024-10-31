import React from 'react';
import classes from './BusSol.module.css';

function BusSolCard({ busSol }) {
  return (
    <>
      <div className={classes.solContainer}>
        <img src="/images/image.png"></img>
        <div>Под заказ</div>
        <div className={classes.shadow}>
          <span>{busSol.name}</span>
          <span>{</span>
        </div>
      </div>
    </>
  );
}

export default BusSolCard;