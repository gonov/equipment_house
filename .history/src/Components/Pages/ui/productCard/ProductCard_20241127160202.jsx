import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router для навигации
import axios from 'axios'; // Подключаем axios
import classes from './ProductCard.module.css';
import serverConfig from '../../../../../serverConfig';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      // Извлекаем токен из куки
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        console.error('Токен не найден в куки');
        navigate('/registration');
        return;
      }

      // Отправляем запрос с токеном в заголовке Authorization
      const response = await axios.post(
        `${serverConfig}/cart`,
        { productId: product.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Передача куки (если всё же требуется)
        }
      );

      console.log('Товар успешно добавлен в корзину:', response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Пользователь не авторизован');
        navigate('/registration');
      } else {
        console.error(
          'Ошибка при добавлении товара в корзину:',
          error.response?.data?.message || error.message
        );
      }
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
