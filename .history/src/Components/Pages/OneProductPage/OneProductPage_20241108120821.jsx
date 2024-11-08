import React, { useState } from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { products, characteristics } from '../Bd';
import ProductCard from '../ui/productCard/ProductCard';

function OneProductPage({ children, ...props }) {
  const { productId } = useParams();

  const product = products.find((prod) => prod.id === 1);

  const [mainImg, setMainImg] = useState(product ? product.img1 : '');
  const [mainDescription, setMainDescription] = useState(
    product ? product.description : ''
  );

  const changeImg = (imageSrc) => {
    setMainImg(imageSrc);
  };

  const changeDescription = (text) => {
    setMainDescription(text);
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
            <img src={mainImg}></img>
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
          <div className={classes.descriptionButton}>
            <button
              className={classes.descriptionButtonBut}
              onClick={() => changeDescription(product.description)}
            >
              Описание
            </button>
            <button
              className={classes.descriptionButtonBut}
              onClick={() => changeDescription(product.characteristics)}
            >
              Характеристики
            </button>
          </div>
          <div className={classes.descriptionText}>
            <span>{mainDescription}</span>
          </div>
          <span className={classes.view}>Смотрели недавно</span>
          <div className={classes.viewedProduct}>
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className={classes.viewedProductCard}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <span className={classes.view}>Смотрели недавно</span>
          <div className={classes.viewedProduct}>
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className={classes.viewedProductCard}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
