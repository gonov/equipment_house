import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './ProductCard.module.css';
import serverConfig from '../../../../../serverConfig';
import uploadsConfig from '../../../../uploadsConfig';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        console.error('Токен не найден в куки');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${serverConfig}/cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log('Товар успешно добавлен в корзину:', response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Пользователь не авторизован');
        navigate('/login');
      } else {
        console.error(
          'Ошибка при добавлении товара в корзину:',
          error.response?.data?.message || error.message
        );
      }
    }
  };

  const goToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div key={product.id} className={classes.container2Card}>
      <img src={`${uploadsConfig}${pr}`} alt={product.name} />
      <span className={classes.container2CardSpan1}>{product.type}</span>

      <div className={classes.container2CardSpan}>
        <span>{product.availability ? 'В наличии' : 'Нет в наличии'}</span>
        {/* Добавлен обработчик клика */}
        <span onClick={goToProductPage} className={classes.productName}>
          {product.name}
        </span>
        <span>{product.price} ₽</span>
      </div>
      <button onClick={addToCart}>В корзину</button>
    </div>
  );
}
