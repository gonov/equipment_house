import React from 'react';
import classes from './BasketCard.module.css';
import uploadsConfig from '../../../../uploadsConfig';

function BasketCard({ el, updateItemCount, removeItem }) {
  const handleQuantityChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    if (newCount >= 0) {
      updateItemCount(el.id, newCount); // Обновляем количество
    }
  };

  return (
    <div className={classes.basketCard}>
      <div className={classes.img}>
        <img src={`${uploadsConfig}${el.img[1]}`} alt={el.product.name} />
      </div>
      <div className={classes.basketNameBlock}>
        <span>{el.product.name}</span>
        <span>Цена: {el.product.price} ₽</span>
      </div>
      <div className={classes.counter}>
        <button onClick={() => updateItemCount(el.id, el.quantity - 1)}>-</button>
        <span>{el.quantity}</span>
        <button onClick={() => updateItemCount(el.id, el.quantity + 1)}>+</button>
      </div>
      <div className={classes.price}>
        <span>{el.product.price * el.quantity} ₽</span>
      </div>
      <button
        className={classes.deleteButton}
        onClick={() => removeItem(el.id)}
      >
        ×
      </button>
    </div>
  );
}

export default BasketCard;
