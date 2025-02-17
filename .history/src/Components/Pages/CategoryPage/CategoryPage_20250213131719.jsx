import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

const itemsPerPage = 12; // Количество товаров на странице

function CategoryPage() {
  const { id } = useParams();
  const categoryId = parseInt(id); // ID категории из URL
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // Категории
  const [products, setProducts] = useState([]); // Товары в текущей категории
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Сортировка
  const [currentPage, setCurrentPage] = useState(0); // Текущая страница

  // ✅ Загружаем категории при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${serverConfig}/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
        setError('Ошибка загрузки категорий');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Загружаем товары при изменении `categoryId`
  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
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
  }, [categoryId]); // Обновляем товары при изменении `categoryId`

  // Фильтрация и сортировка товаров
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  // Пагинация
  const offset = currentPage * itemsPerPage;
  const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // ✅ Функция перехода на страницу категории при клике в меню
  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
    setCurrentPage(0); // Сброс страницы при смене категории
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

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
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log('Товар добавлен в корзину');
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error.message);
    }
  };

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  const resolveImagePath = (img) => {
    if (Array.isArray(img) && img.length > 0) {
      return img[0].startsWith('http') ? img[0] : `${uploadsConfig}${img[0]}`;
    }
    return '/default-image.jpg'; // Путь к изображению по умолчанию
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

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.categoryName}>
          <span>
            {categories.find((cat) => cat.id === categoryId)?.title ||
              'Категория не найдена'}
          </span>
        </div>
        <div className={classes.container}>
          {/* Левое меню с категориями */}
          <div className={classes.leftBlock}>
            <span className={classes.leftBlockName}>Каталог</span>
            {categories.map((category) => (
              <div
                key={category.id}
                className={classes.leftBlockCategory}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span>{category.title}</span>
              </div>
            ))}
          </div>

          {/* Контент с товарами */}
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
                      <span className={classes.productName}>
                        {product.name}
                      </span>
                      <span>{product.price.toLocaleString()} ₽</span>
                    </div>
                    <button onClick={() => addToCart(product)}>В корзину</button>
                  </div>
                ))
              ) : (
                <h2>Товары не найдены</h2>
              )}
            </div>

            {/* Пагинация */}
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              breakLabel={'...'}
              pageCount={Math.ceil(sortedProducts.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={classes.pagination}
              activeClassName={classes.active}
              previousClassName={classes.previous}
              nextClassName={classes.next}
              pageClassName={classes.page}
            />
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default CategoryPage;
