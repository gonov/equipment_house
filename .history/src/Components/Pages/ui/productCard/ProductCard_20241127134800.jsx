import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router для навигации
import classes from './ProductCard.module.css';
import serverConfig from '../../../../../serverConfig';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async () => {
    // Проверяем наличие авторизационной куки
    const isAuthorized = document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith('authToken='));

    if (!isAuthorized) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate('/registration');
      return;
    }

    try {
      const response = await fetch(`${serverConfig}/cart`, {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Указываем, что запрос должен отправлять куки
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

  return (
    <div key={product.id} className={classes.container2Card}>
      <img src={product.img1} alt={product.name} />
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
