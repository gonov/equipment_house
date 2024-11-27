import React from 'react';
import classes from './BasketCard.module.css';

function BasketCard({ el, updateItemCount, removeItem }) {
  const handleQuantityChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    if (newCount >= 0) {
      updateItemCount(el.id, newCount); // Обновляем количество
    }
  };

  return (
    <div className={classes.basketCard}>
      <img src={el.product.image} alt={el.product.name} className={classes.image} />
      <div className={classes.details}>
        <h3>{el.product.name}</h3>
        <p>Цена: {el.product.price} ₽</p>
        <div className={classes.quantity}>
          <label htmlFor={`quantity-${el.id}`}>Количество:</label>
          <input
            id={`quantity-${el.id}`}
            type="number"
            value={el.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button onClick={() => removeItem(el.id)}>Удалить</button>
      </div>
    </div>
  );
}

export default BasketCard;
