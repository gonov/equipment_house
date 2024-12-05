import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import ProductCard from '../ui/productCard/ProductCard';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

function OneProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Товар по ID
  const [products, setProducts] = useState([]); // Все товары
  const [mainImg, setMainImg] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос на один товар
        const productResponse = await axios.get(
          `${serverConfig}/products/${productId}`
        );
        const fetchedProduct = productResponse.data;

        // Запрос на все товары
        const allProductsResponse = await axios.get(`${serverConfig}/products`);
        const allProducts = allProductsResponse.data;

        // Установка состояний
        setProduct(fetchedProduct);
        setProducts(allProducts);
        if (fetchedProduct.img && fetchedProduct.img.length > 0) {
          setMainImg(`${uploadsConfig}${fetchedProduct.img[0]}`);
        }
        setMainDescription(fetchedProduct.description);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить данные.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <CenterBlock>
      <WidthBlock>
        <div className={classes.prodName}>
          <span>{product.name}</span>
          <span>Код товара: {product.code}</span>
        </div>
        <div className={classes.container1}>
          <img src={mainImg} alt={product.name} />
          <div className={classes.container1Characteristics}>
            <p>Характеристики</p>
            <span>{product.characteristics}</span>
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
          {product.img &&
            product.img.map((img, index) => (
              <img
                key={index}
                src={product.img}
                alt={`Image ${index + 1}`}
                // onClick={() => changeImg(`${uploadsConfig}${img}`)}
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
          {products.slice(0, 4).map((viewedProduct) => (
            <div key={viewedProduct.id} className={classes.viewedProductCard}>
              <ProductCard product={viewedProduct} />
            </div>
          ))}
        </div>
        <span className={classes.view}>Похожие товары</span>
        <div className={classes.viewedProduct}>
          {products.slice(0, 4).map((similarProduct) => (
            <div key={similarProduct.id} className={classes.viewedProductCard}>
              <ProductCard product={similarProduct} />
            </div>
          ))}
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default OneProductPage;
