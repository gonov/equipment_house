import React, { useState } from 'react';
import classes from './ProductCard.module.css';

export default function ProductCard({ el, updateItemCount }) {
  const [count, setCount] = useState(el.count || 1);

  const increaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateItemCount(el.id, newCount);
  };

  const decreaseCount = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateItemCount(el.id, newCount);
    }
  };

  const totalPrice = el.price * count;

  return (
    <>
      <div className={classes.img}>
        <img src={el.img} alt="" />
      </div>
      <div className={classes.basketNameBlock}>
        <span>{el.name}</span>
        <span>{el.availability ? 'В наличии' : 'Нет в наличии'}</span>
      </div>
      <div className={classes.counter}>
        <button onClick={decreaseCount}>-</button>
        <div className={classes.spanGroup}>
          <span>{count}</span>
          <span>шт</span>
        </div>
        <button onClick={increaseCount}>+</button>
      </div>
      <div className={classes.price}>
        <span>{totalPrice} ₽</span>
      </div>
      <button className={classes.deleteButton}>x</button>
    </>
  );
}
