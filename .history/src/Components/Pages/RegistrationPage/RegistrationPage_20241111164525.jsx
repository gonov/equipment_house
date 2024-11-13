import React from 'react';
import classes from './RegistrationPage.module.css';

function RegistrationPage({ children, ...props }) {
  return <>
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
  </>;
}

export default RegistrationPage;
