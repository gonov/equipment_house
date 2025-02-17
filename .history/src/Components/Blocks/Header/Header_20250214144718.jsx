import React, { useEffect, useState } from 'react';
import classes from '../';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import serverConfig from '../../../../serverConfig';
import axios from 'axios';
import uploadsConfig from '../../../uploadsConfig';

const itemsPerPage = 12; // Количество товаров на странице

function CategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id); // Преобразуем id в число
  const location = useLocation(); // Используем location для перерисовки
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  // Перерисовка при изменении URL (когда категория меняется)
  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get(`${serverConfig}/categories`),
          axios.get(`${serverConfig}/products?categoryId=${categoryId}`)
        ]);

        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, location.key]); // Теперь useEffect перезапускается при изменении URL

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );
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

      await axios.post(
        `${serverConfig}/cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      alert('Товар успешно добавлен в корзину!');
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Пользователь не авторизован');
        navigate('/login');
      } else {
        console.error('Ошибка при добавлении товара в корзину:', error);
      }
    }
  };

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`);
  };

  const resolveImagePath = (img) => {
    if (Array.isArray(img) && img.length > 0) {
      return img[0].startsWith('http') ? img[0] : `${uploadsConfig}${img[0]}`;
    }
    return '/default-image.jpg';
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
          <span>{categories.find((c) => c.id === categoryId)?.title || 'Категория не найдена'}</span>
        </div>
        <div className={classes.container}>
          <div className={classes.rightBlock}>
            <div className={classes.rightBlockFilter}>
              <button className={`${classes.filterButton} ${sortOrder === 'asc' ? classes.activeFilter : ''}`} onClick={() => handleSortChange('asc')}>
                По возрастанию цены
              </button>
              <button className={`${classes.filterButton} ${sortOrder === 'desc' ? classes.activeFilter : ''}`} onClick={() => handleSortChange('desc')}>
                По убыванию цены
              </button>
            </div>

            <div className={classes.rightBlockProducts}>
              {currentProducts.map((product) => (
                <div key={product.id} className={classes.container2Card}>
                  <img src={resolveImagePath(product.img)} alt={product.name} onClick={() => goToProductPage(product.id)} />
                  <div className={classes.container2CardSpan} onClick={() => goToProductPage(product.id)}>
                    <span className={classes.productName}>{product.name}</span>
                    <span>{parseInt(product.price).toLocaleString('ru-RU')} ₽</span>
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
