import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './BasketPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import BasketCard from '../ui/basketCard/BasketCard';
import serverConfig from '../../../../serverConfig';
import Cookies from 'js-cookie'; // Для работы с куки
import jwt_decode from 'jwt-decode'; // Для декодирования JWT токена

function BasketPage() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [adress, setAdress] = useState(''); // Добавляем поле для адреса
  const [userData, setUserData] = useState(null);

  const token = Cookies.get('authToken') || localStorage.getItem('authToken');

  // Обновление данных пользователя из токена
  const updateUserData = () => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token); // Декодируем токен
        setUserData({
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        });
        // Логируем имя и почту
        console.log('Имя пользователя:', decodedToken.name);
        console.log('Email пользователя:', decodedToken.email);
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error.message);
      }
    }
  };

  useEffect(() => {
    updateUserData();
  }, [token]);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith('authToken='))
          ?.split('=')[1];

        if (!token) {
          alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
          return;
        }

        const response = await axios.get(`${serverConfig}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setItems(response.data.basketItems);
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error.message);
      }
    };

    fetchBasket();
  }, []);

  useEffect(() => {
    const total = items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [items]);

  const updateItemCount = async (id, newCount) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
        return;
      }

      await axios.put(
        `${serverConfig}/cart/${id}`,
        { quantity: newCount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newCount } : item
        )
      );
    } catch (error) {
      console.error('Ошибка при обновлении количества товара:', error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
        return;
      }

      await axios.delete(`${serverConfig}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error.message);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePlaceOrder = async () => {
    // Проверка данных перед отправкой
    if (!adress.trim()) {
      alert('Пожалуйста, введите адрес.');
      return;
    }

    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
        return;
      }

      // Логируем данные перед отправкой
      console.log({
        paymentMethod,
        name: userData?.name, // Имя пользователя
        email: userData?.email, // Email пользователя
        items,
        totalPrice,
        adress,
      });

      const response = await axios.post(
        `${serverConfig}/orders`,
        {
          paymentMethod,
          name: userData?.name, // Имя пользователя
          email: userData?.email, // Email пользователя
          items, // Товары в заказе
          total: totalPrice, // Общая сумма
          adress, // Адрес
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Заказ оформлен! Мы отправили вам подтверждение на почту.');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error.message);
      alert('Не удалось оформить заказ. Попробуйте еще раз.');
    }
  };

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.basketContainer}>
          <div className={classes.basketContainerTitle}>Моя корзина</div>
          <div className={classes.basketContainerCards}>
            {items.length > 0 ? (
              items.map((el) => (
                <BasketCard
                  key={el.id}
                  el={el}
                  updateItemCount={updateItemCount}
                  removeItem={removeItem}
                />
              ))
            ) : (
              <p>Ваша корзина пуста</p>
            )}
          </div>
          <div className={classes.basketContainerOrder}>
            <div className={classes.basketContainerOrderPrice}>
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <div className={classes.paymentMethodSelect}>
              <label htmlFor="paymentMethod">Выберите способ оплаты:</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="creditCard">Кредитная карта</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Банковский перевод</option>
              </select>
            </div>
            <div className={classes.addressInput}>
              <label htmlFor="adress">Введите адрес доставки:</label>
              <input
                type="text"
                id="adress"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                placeholder="Введите адрес"
              />
            </div>
            <button onClick={handlePlaceOrder}>Оформить заказ</button>
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default BasketPage;
