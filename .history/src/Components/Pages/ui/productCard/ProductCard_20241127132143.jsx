import React from 'react';
import classes from './ProductCard.module.css';
import serverConfig from '../../../../../serverConfig';

export default function ProductCard({ product }) {

  const aadToCart = async () => {
    try {
      const response = await fetch (`${serverConfig\}`)
    } catch (error) {
      
    }
  }

  // console.log(product);
  return (
    <div key={product.id} className={classes.container2Card}>
      <img src={product.img1} />
      <span className={classes.container2CardSpan1}>{product.type}</span>

      <div className={classes.container2CardSpan}>
        <span>{product.availability ? 'В наличии' : 'Нет в наличии'}</span>
        <span>{product.name}</span>
        <span>{product.price} ₽</span>
      </div>
      <button>В корзину</button>
    </div>
  );
}
