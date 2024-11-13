import React from 'react';
import classes from './ProductCard.module.css';

export default function ProductCard({ product }) {
  console.log(product);
  return (
    <div className={classes.container}>
      <img src={product.img} alt={product.name} />
      <div className={classes.type}>{product.type}</div>
      <div className={classes.containerText}>
        <div>{product.availability ? "в наличии" : }</div>
        <div>{product.name}</div>
        <div>{product.price} ₽</div>
      </div>
      <button>В корзину</button>
    </div>
  );
}
