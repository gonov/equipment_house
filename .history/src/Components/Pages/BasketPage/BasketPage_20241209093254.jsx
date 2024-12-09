import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './BasketPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import BasketCard from '../ui/basketCard/BasketCard';
import serverConfig from '../../../../serverConfig';

function BasketPage() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    phone: '',
    
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Обновление количества товара в корзине
  };

  const removeItem = async (id) => {
    // Удаление товара из корзины
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))?.split('=')[1];

      if (!token) {
        alert('Вы не авторизованы');
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        `${serverConfig}/order`,
        {
          items,
          totalPrice,
          orderDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert('Заказ оформлен!');
      setItems([]); // Очистить корзину
      setOrderDetails({
        name: '',
        address: '',
        phone: '',
      });
      setIsSubmitting(false);
    } catch (error) {
      alert('Ошибка при оформлении заказа');
      setIsSubmitting(false);
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
               {/* Форма для оформления заказа */}
               <form onSubmit={handleSubmit} className={classes.orderForm}>
              <div>
              
                <input
                  type="text"
                  name="name"
                  placeholder=''
                  value={orderDetails.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
            
                <input
                  type="text"
                  name="address"
                  value={orderDetails.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
           
                <input
                  type="text"
                  name="phone"
                  value={orderDetails.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Оформляем...' : 'Оформить заказ'}
              </button>
            </form>
            </div>
            <div className={classes.basketContainerOrderPrice}>
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>

        
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default BasketPage;
