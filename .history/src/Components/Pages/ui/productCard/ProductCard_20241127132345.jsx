import React from 'react';
import classes from './ProductCard.module.css';
import serverConfig from '../../../../../serverConfig';

export default function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      const response = await fetch(`${serverConfig}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении товара в корзину');
      }

      const data = await response.json();
      console.log('Товар успешно добавлен в корзину:', data);
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };

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
      <button onClick={addToCart}>В корзину</button>
    </div>
  );
}
