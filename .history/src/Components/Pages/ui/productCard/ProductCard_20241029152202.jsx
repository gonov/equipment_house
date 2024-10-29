import React from 'react';
import classes from './ProductCard.module.css';

export default function ProductCard({ product }) {
  console.log()
  return (
    <div className={classes.container}>
      
      <img src={product.img} alt={product.name} />
      <div>{product.availability || 'В наличии'}</div>
      <div>{product.name}</div>
      <div>{product.price} ₽</div>
      <button>В корзину</button>
    </div>
  );
}