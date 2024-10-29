import React from 'react';
import classes from './ProductCard.module.css';

export default function ProductCard({ product }) {
  console.log(product)
  return (
    <div className={classes.container}>
      
      <img src={/images/group3.png} alt={product.name} />
      <div>{product.availability || 'В наличии'}</div>
      <div>{product.name}</div>
      <div>{product.price} ₽</div>
      <button>В корзину</button>
    </div>
  );
}