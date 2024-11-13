import React from 'react';
import classes from './BusSol.module.css';

function BusSolCard({ }) {
  return <>
  <div className={classes.solContainer}>
    <img src='/images/image.png'></img>
    <div>Под заказ</div>
    <div className={classes.shadow}>
      <span></span>
    </div>
  </div>
  </>;
}

export default BusSolCard;
