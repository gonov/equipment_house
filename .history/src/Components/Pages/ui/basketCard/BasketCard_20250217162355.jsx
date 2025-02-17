import React from 'react';
import classes from './BasketCard.module.css';
import uploadsConfig from '../../../../uploadsConfig';
import { useNavigate } from 'react-router-dom';

function BasketCard({ el, updateItemCount, removeItem }) {
  const navigate = useNavigate()
  const handleQuantityChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    if (newCount >= 0) {
      updateItemCount(el.id, newCount); // Обновляем количество
    }
  };

  return (
    <div className={classes.basketCard}>
      <div className={classes.img}>
        <img src={`${el.product.img}`} alt={el.product.name} />
      </div>
      <div className={classes.basketNameBlock}>
        <span onClick={() => navigate(`/product/${el.}`)}>{el.product.name}</span>
        <span>Цена: {el.product.price.toLocaleString('ru-RU')} ₽</span>
      </div>
      <div className={classes.counter}>
        <button onClick={() => updateItemCount(el.id, el.quantity - 1)}>
          -
        </button>
        <span>{el.quantity}</span>
        <button onClick={() => updateItemCount(el.id, el.quantity + 1)}>
          +
        </button>
      </div>
      <div className={classes.price}>
      <span>{(el.product.price * el.quantity).toLocaleString('ru-RU')} ₽</span>

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
