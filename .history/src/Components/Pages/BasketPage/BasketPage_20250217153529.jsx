import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import classes from './BasketPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import BasketCard from '../ui/basketCard/BasketCard';
import serverConfig from '../../../../serverConfig';
import Cookies from 'js-cookie'; // Для работы с куки
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

function BasketPage() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [userData, setUserData] = useState(null);

  // Хук для навигации
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('authToken'); // Используем Cookies для получения токена

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error.message);
      }
    } else {
      alert('Вы не авторизованы');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Получаем товары из корзины, если есть
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(cart);

    // Расчитываем общую цену
    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(price);
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitOrder = async () => {
    if (!adress || !phone) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const orderData = {
      items,
      totalPrice,
      paymentMethod,
      adress,
      phone,
      userData, // Данные пользователя
    };

    try {
      await axios.post(`${serverConfig}/order`, orderData);
      alert('Заказ успешно оформлен!');
      localStorage.removeItem('cart');
      navigate('/order-success');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error.message);
      alert('Ошибка при оформлении заказа.');
    }
  };

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.basketContainer}>
          <h2>Корзина</h2>
          <div className={classes.itemsList}>
            {items.length > 0 ? (
              items.map((item) => <BasketCard key={item.id} item={item} />)
            ) : (
              <p>Ваша корзина пуста</p>
            )}
          </div>

          <div className={classes.totalPrice}>
            <span>Общая сумма: </span>
            <span>{totalPrice} ₽</span>
          </div>

          <div className={classes.paymentMethod}>
            <label>
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={handlePaymentMethodChange}
              />
              Кредитная карта
            </label>
            <label>
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={handlePaymentMethodChange}
              />
              PayPal
            </label>
          </div>

          <div className={classes.deliveryDetails}>
            <label>
              Адрес доставки:
              <input
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                placeholder="Введите адрес"
              />
            </label>
            <label>
              Телефон:
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Введите номер телефона"
              />
            </label>
          </div>

          <button className={classes.submitOrderButton} onClick={handleSubmitOrder}>
            Оформить заказ
          </button>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default BasketPage;
