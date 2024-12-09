import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './BasketPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import BasketCard from '../ui/basketCard/BasketCard';
import serverConfig from '../../../../serverConfig';
import Cookies from 'js-cookie'; // Для работы с куки

function BasketPage() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Загружаем данные из куки (если есть)
    setName(Cookies.get('userName') || '');
    setPhone(Cookies.get('userPhone') || '');
    setEmail(Cookies.get('userEmail') || '');

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

  const saveUserDataToCookies = () => {
    Cookies.set('userName', name, { expires: 7 });
    Cookies.set('userPhone', phone, { expires: 7 });
    Cookies.set('userEmail', email, { expires: 7 });
  };

  const handlePlaceOrder = async () => {
    // Сохраняем данные пользователя в куки
    saveUserDataToCookies();

    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
        return;
      }

      const response = await axios.post(
        `${serverConfig}/api/order`,
        {
          paymentMethod,
          name,
          phone,
          email,
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
            <div className={classes.basketContainerOrderInput}>
              <span>Введите ваше имя:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={classes.basketContainerOrderInput}>
              <span>Введите ваш телефон:</span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={classes.basketContainerOrderInput}>
              <span>Введите ваш email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
            <button onClick={handlePlaceOrder}>Оформить заказ</button>
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default BasketPage;
