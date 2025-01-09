import React, { useEffect, useState } from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import serverConfig from '../../../../serverConfig';
import axios from 'axios';

const itemsPerPage = 12; // Количество продуктов на странице

function CategoryPage({ children, ...props }) {
  const { id } = useParams();
  const categoryId = parseInt(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка категорий
        const categoriesResponse = await axios.get(`${serverConfig}/categories`);
        setCategories(categoriesResponse.data);

        // Загрузка товаров
        const productsResponse = await axios.get(`${serverConfig}/products`);
        setProducts(productsResponse.data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter((product) => product.categoryId === categoryId);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  const productsInCategory = getProductsByCategory(selectedCategoryId);

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    setCurrentPage(0);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;

  const sortedProducts = [...productsInCategory].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage);

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

      console.log('Товар успешно добавлен в корзину:', response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Пользователь не авторизован');
        navigate('/login');
      } else {
        console.error(
          'Ошибка при добавлении товара в корзину:',
          error.response?.data?.message || error.message
        );
      }
    }
  };

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  const resolveImagePath = (img) => {
    if (Array.isArray(img) && img.length > 0) {
      return img[0].startsWith('http') ? img[0] : `${serverConfig}${img[0]}`;
    }
    return '/default-image.jpg'; // Укажите путь к изображению по умолчанию
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
            {selectedCategory ? selectedCategory.title : 'Категория не найдена'}
          </span>
        </div>
        <div className={classes.container}>
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
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={classes.container2Card}
                >
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
                    <span>{product.price} ₽</span>
                  </div>
                  <button onClick={() => addToCart(product)}>В корзину</button>
                </div>
              ))}
            </div>
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
