import React, { useState, useEffect } from 'react';
import classes from './BasketPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { products } from '../Bd';
import BasketCard from '/ui/basketPage/BasketCard';

function BasketPage() {
  const [items, setItems] = useState(
    products.map((product) => ({ ...product, count: 1 })) // Инициализация count
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = items.reduce((sum, item) => {
      // Проверка, чтобы избежать NaN
      const itemTotal = item.price * (item.count || 0);
      return sum + itemTotal;
    }, 0);
    setTotalPrice(total);
  }, [items]);

  const updateItemCount = (id, newCount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      )
    );
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
                  <BasketCard el={el} updateItemCount={updateItemCount} />
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
