import React from 'react';
import classes from './BusSol.module.css';

function BusSolCard({ children, ...props }) {
  return <>
  <div className={classes.solContainer}>
    <img src='/images/image.png'></img>
    <div>Под заказ</div>
  </div>
  </>;
}

export default BusSolCard;
