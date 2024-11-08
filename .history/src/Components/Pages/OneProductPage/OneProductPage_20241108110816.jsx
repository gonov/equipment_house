import React, { useState } from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { products, characteristics } from '../Bd';

function OneProductPage({ children, ...props }) {
  const { productId } = useParams();

  const product = products.find((prod) => prod.id === 1);

  const [mainImg, setMainImg] = useState(product ? product.img);

  const changeImg = (imageSrc) => {
    setMainImg(imageSrc);
  };

  if (!product) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>Продукт не найден</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.prodName}>
            <span>{product.name}</span>
            <span>Код товара: {product.code}</span>
          </div>
          <div className={classes.container1}>
            <img src={product.img1}></img>
            <div className={classes.container1Characteristics}>
              <p>Характеристики</p>
              <span>Артикул - {characteristics.article}</span>
              <span>Серия - {characteristics.series}</span>
              <span>Установка - {characteristics.installation}</span>
              <span>Подключение - {characteristics.connection}</span>
            </div>
            <div className={classes.container1Summ}>
              <span>Цена без скидки (с НДС)</span>
              <span>{product.price} ₽</span>
              <span>
                {product.availability ? 'В наличии' : 'Нет в наличии'}
              </span>
              <button className={classes.container1SummButton}>
                В корзину
              </button>
            </div>
          </div>
          <div className={classes.twoImg}>
            <img
              src={product.img1}
              alt=""
              onClick={() => changeImg(product.img1)}
            />
            <img
              src={product.img2}
              alt=""
              onClick={() => changeImg(product.img2)}
            />
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
