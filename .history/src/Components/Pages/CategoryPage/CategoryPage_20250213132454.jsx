import React, { useEffect, useState } from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import serverConfig from '../../../../serverConfig';
import axios from 'axios';
import uploadsConfig from '../../../uploadsConfig';

const itemsPerPage = 12; // Количество продуктов на странице

function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryId = parseInt(id, 10);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  // 🔹 Загружаем категории один раз при загрузке страницы
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverConfig}/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
        setError('Ошибка загрузки категорий');
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Загружаем товары при изменении категории
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `${serverConfig}/products?categoryId=${categoryId}`
        );
        setProducts(response.data);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError('Ошибка загрузки товаров');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]); // Следим за изменением категории

  // 🔹 Функция сортировки
  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

  // 🔹 Фильтрация и сортировка товаров
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const offset = currentPage * itemsPerPage;
  const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage);

  // 🔹 Пагинация
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // 🔹 Переход на другую категорию
  const handleCategoryClick = (id) => {
    if (categoryId !== id) {
      navigate(`/category/${id}`);
    }
  };

  // 🔹 Определение активной категории
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  // 🔹 Обработчик добавления товара в корзину
  const addToCart = async (product) => {
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

      await axios.post(
        `${serverConfig}/cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error.message);
    }
  };

  // 🔹 Переход на страницу товара
  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  // 🔹 Корректное определение пути изображения
  const resolveImagePath = (img) => {
    if (Array.isArray(img) && img.length > 0) {
      return img[0].startsWith('http') ? img[0] : `${uploadsConfig}${img[0]}`;
    }
    return '/default-image.jpg'; // Путь к изображению по умолчанию
  };

  // 🔹 Лоадер
  if (loading) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>Загрузка...</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  // 🔹 Ошибка
  if (error) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>{error}</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.categoryName}>
          <span>{selectedCategory ? selectedCategory.title : 'Категория не найдена'}</span>
        </div>
        <div className={classes.container}>
          {/* 🔹 Боковое меню с категориями */}
          <div className={classes.leftBlock}>
            <span className={classes.leftBlockName}>Каталог</span>
            {categories.map((category) => (
              <div
                key={category.id}
                className={classes.leftBlockCategory}
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  fontWeight: category.id === categoryId ? 'bold' : 'normal', // Выделение активной категории
                  cursor: 'pointer',
                }}
              >
                <span>{category.title}</span>
              </div>
            ))}
          </div>

          {/* 🔹 Блок с товарами */}
          <div className={classes.rightBlock}>
            <div className={classes.rightBlockFilter}>
              <button onClick={() => handleSortChange('asc')}>
                По возрастанию цены
              </button>
              <button onClick={() => handleSortChange('desc')}>
                По убыванию цены
              </button>
            </div>
            <div className={classes.rightBlockProducts}>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div key={product.id} className={classes.container2Card}>
                    <img
                      src={resolveImagePath(product.img)}
                      alt={product.name}
                      onClick={() => goToProductPage(product.id)}
                    />
                    <div
                      className={classes.container2CardSpan}
                      onClick={() => goToProductPage(product.id)}
                    >
                      <span className={classes.productName}>{product.name}</span>
                      <span>{product.price.toLocaleString()} ₽</span>
                    </div>
                    <button onClick={() => addToCart(product)}>В корзину</button>
                  </div>
                ))
              ) : (
                <p>Товары не найдены</p>
              )}
            </div>

            {/* 🔹 Пагинация */}
            <ReactPaginate
              previousLabel={<span className={classes.arrow}>← Предыдущая</span>}
              nextLabel={<span className={classes.arrow}>Следующая →</span>}
              breakLabel={'...'}
              pageCount={Math.ceil(sortedProducts.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={classes.pagination}
              activeClassName={classes.active}
            />
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default CategoryPage;
