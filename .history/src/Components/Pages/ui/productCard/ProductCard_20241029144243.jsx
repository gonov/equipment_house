import React from 'react';
import classes from './YourStyles.module.css'; // Импортируйте ваши стили

export default function ProductCard({ product }) {
  return (
    <div className={classes.container}>
      <img src={product.img} alt={product.name} />
      <div>{product.availability}</div>
      <div>{product.name}</div>
      <div>{product.price} ₽</div>
      <button>В корзину</button>
    </div>
  );
}