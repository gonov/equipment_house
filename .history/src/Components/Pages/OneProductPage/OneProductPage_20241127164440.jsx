import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import ProductCard from '../ui/productCard/ProductCard';
import serverConfig from '../../../../serverConfig';

function OneProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных с сервера
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${serverConfig}/products/${productId}`
        );
        const response2 = await axios.get(`${serverConfig}/products`);
        const fetchedProduct = response.data;

        setProduct(fetchedProduct);
        setMainImg(fetchedProduct.img1);
        setMainDescription(fetchedProduct.description);
      } catch (err) {
        console.error('Ошибка при загрузке продукта:', err);
        setError('Не удалось загрузить данные о продукте.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const changeImg = (imageSrc) => {
    setMainImg(imageSrc);
  };

  const changeDescription = (text) => {
    setMainDescription(text);
  };

  if (loading) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>Загрузка...</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  if (error) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>{error}</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

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
            <img src={mainImg} alt={product.name}></img>
            <div className={classes.container1Characteristics}>
              <p>Характеристики</p>
              {product.characteristics.map((char, index) => (
                <span key={index}>
                  {char.name} - {char.value}
                </span>
              ))}
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
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                onClick={() => changeImg(img)}
              />
            ))}
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
              onClick={() => changeDescription(product.characteristicsText)}
            >
              Характеристики
            </button>
          </div>
          <div className={classes.descriptionText}>
            <span>{mainDescription}</span>
          </div>
          <span className={classes.view}>Смотрели недавно</span>
          <div className={classes.viewedProduct}>
            {product.recentlyViewed.map((viewedProduct) => (
              <div key={viewedProduct.id} className={classes.viewedProductCard}>
                <ProductCard product={viewedProduct} />
              </div>
            ))}
          </div>
          <span className={classes.view}>Похожие товары</span>
          <div className={classes.viewedProduct}>
            {product.similarProducts.map((similarProduct) => (
              <div
                key={similarProduct.id}
                className={classes.viewedProductCard}
              >
                <ProductCard product={similarProduct} />
              </div>
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
