import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './BasketPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import BasketCard from '../ui/basketCard/BasketCard';
import serverConfig from '../../../../serverConfig'; // Убедитесь, что путь правильный

function BasketPage() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const response = await axios.get(`${serverConfig}/basket`, {
          withCredentials: true, // Передача куки
        });
        setItems(response.data.basketItems); // Предполагаем, что сервер возвращает массив basketItems
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error.message);
      }
    };

    fetchBasket();
  }, []);

  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const itemTotal = item.product.price * item.quantity; // Цена умножается на количество
      return sum + itemTotal;
    }, 0);
    setTotalPrice(total);
  }, [items]);

  const updateItemCount = async (id, newCount) => {
    try {
      // Отправляем обновление количества на сервер
      await axios.put(`${serverConfig}/basket/${id}`, { quantity: newCount }, {
        withCredentials: true,
      });
      // Обновляем локальное состояние
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
      // Отправляем запрос на удаление
      await axios.delete(`${serverConfig}/basket/${id}`, {
        withCredentials: true,
      });
      // Обновляем локальное состояние
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error.message);
    }
  };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.basketContainer}>
            <div className={classes.basketContainerTitle}>Моя корзина</div>
            <div className={classes.basketContainerCards}>
              {items.map((el) => (
                <div
                  key={el.id}
                  className={classes.basketContainerCardsElement}
                >
                  <BasketCard
                    el={el}
                    updateItemCount={updateItemCount}
                    removeItem={removeItem} // Передаём функцию удаления
                  />
                </div>
              ))}
            </div>
            <div className={classes.basketContainerOrder}>
              <div className={classes.basketContainerOrderInput}>
                <span>Введите код купона для скидки</span>
                <input type="text" />
              </div>
              <div className={classes.basketContainerOrderPrice}>
                <span>Итого:</span>
                <span>{totalPrice} ₽</span>
              </div>
              <button>Оформить заказ</button>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default BasketPage;
