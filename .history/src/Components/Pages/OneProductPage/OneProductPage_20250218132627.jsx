import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../ui/productCard/ProductCard';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';
import { toast } from 'react-toastify';

const resolveImagePath = (imgPath) => {
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
    return imgPath;
  }
  return `${uploadsConfig}${imgPath}`;
};

function OneProductPage() {
  const navigate = useNavigate();

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]); // Просмотренные товары
  const [mainImg, setMainImg] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // 'description' или 'characteristics'

  const addToCart = async (e) => {
    e.stopPropagation(); // предотвращаем переход на страницу товара при клике на кнопку

    try {
      const token = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        console.error('Токен не найден в куки');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${serverConfig}/cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Показываем красивое уведомление
      toast.success('Товар успешно добавлен в корзину!');
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Пользователь не авторизован');
        navigate('/login');
      } else {
        console.error(
          'Ошибка при добавлении товара в корзину:',
          error.response?.data?.message || error.message
        );
        // Показываем ошибку
        toast.error('Ошибка при добавлении товара в корзину');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `${serverConfig}/products/${productId}`
        );
        const fetchedProduct = productResponse.data;

        const allProductsResponse = await axios.get(`${serverConfig}/products`);
        const allProducts = allProductsResponse.data;

        setProduct(fetchedProduct);
        setProducts(allProducts);

        if (fetchedProduct.img && fetchedProduct.img.length > 0) {
          setMainImg(resolveImagePath(fetchedProduct.img[0]));
        }

        setMainDescription(fetchedProduct.description);

        // Добавляем текущий товар в список просмотренных
        updateViewedProducts(fetchedProduct, allProducts);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить данные.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const updateViewedProducts = (currentProduct, allProducts) => {
    let viewed = JSON.parse(localStorage.getItem('viewedProducts')) || [];

    // Удаляем дубликаты и ограничиваем список (например, 5 товаров)
    viewed = viewed.filter((p) => p.id !== currentProduct.id);
    viewed.unshift(currentProduct);
    if (viewed.length > 5) viewed.pop(); // Ограничение на 5 последних товаров

    localStorage.setItem('viewedProducts', JSON.stringify(viewed));
    setViewedProducts(viewed);
  };

  const changeImg = (imageSrc) => {
    setMainImg(resolveImagePath(imageSrc));
  };

  const changeDescription = (text) => {
    setMainDescription(text);
  };

  const displayCharacteristics = (characteristics) => {
    return characteristics.map((el, index) => (
      <li key={index}>
        <strong>{el.name}:</strong> {el.value}
      </li>
    ));
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
        <div className={classes.container1}>
          <img src={mainImg} alt={product.name} />
          {/* <div className={classes.container1Characteristics}>
            <p>Характеристики</p>
            <ul>
              {product.characteristics &&
                product.characteristics
                  .filter((el) => el.name !== 'Описание в характеристиках')
                  .map((el, index) => (
                    <li key={index}>
                      {el.name} - {el.value}
                    </li>
                  ))}
            </ul>
          </div> */}
          <div className={classes.prodName}>
            <span>{product.name}</span>
          </div>
          <div className={classes.container1Summ}>
            <span>Цена без скидки (с НДС)</span>
            <span>{parseInt(product.price).toLocaleString('ru-RU')} ₽</span>

            <button
              className={classes.container1SummButton}
              onClick={addToCart}
            >
              В корзину
            </button>
            {/* <button className={classes.container1SummButton}>Подробнее</button> */}
          </div>
        </div>
        <div className={classes.twoImg}>
          {product.img &&
            product.img.map((img, index) => (
              <img
                key={index}
                src={resolveImagePath(img)}
                alt={`Image ${index + 1}`}
                onClick={() => changeImg(img)}
                className={
                  mainImg === resolveImagePath(img) ? classes.active : ''
                }
              />
            ))}
        </div>
        <div className={classes.descriptionButton}>
          <button
            className={`${classes.descriptionButtonBut} ${
              activeTab === 'description' ? classes.active : ''
            }`}
            onClick={() => {
              changeDescription(product.description);
              setActiveTab('description');
            }}
          >
            Описание
          </button>
          <button
            className={`${classes.descriptionButtonBut} ${
              activeTab === 'characteristics' ? classes.active : ''
            }`}
            onClick={() => {
              changeDescription(
                product.characteristics &&
                  displayCharacteristics(product.characteristics)
              );
              setActiveTab('characteristics');
            }}
          >
            Характеристики
          </button>
        </div>
        <div className={classes.descriptionText}>
          <span>{mainDescription}</span>
        </div>

        <span className={classes.view}>Смотрели недавно</span>
        <div className={classes.viewedProduct}>
          {viewedProducts.slice(0, 4).map((viewedProduct) => (
            <div key={viewedProduct.id} className={classes.viewedProductCard}>
              <ProductCard product={viewedProduct} />
            </div>
          ))}

          {/* Добавляем пустые блоки, если товаров меньше 4 */}
          {Array.from({ length: Math.max(0, 4 - viewedProducts.length) }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className={classes.emptyProductCard}
              />
            )
          )}
        </div>

        <span className={classes.view}>Похожие товары</span>
        <div className={classes.viewedProduct}>
          {products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка по дате (новые первыми)
            .slice(0, 4) // Ограничение до 4 товаров
            .map((similarProduct, index) => (
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
  );
}

export default OneProductPage;
