import React, { useEffect, useState } from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
// import { categories, getProductsByCategory } from '../Bd';
import ReactPaginate from 'react-paginate';
import serverConfig from '../../../../serverConfig';

const itemsPerPage = 12; // Количество продуктов на странице

function CategoryPage({ children, ...props }) {
  const { id } = useParams();
  const categoryId = parseInt(id);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка категорий
        const categoriesResponse = await fetch(`${serverConfig}/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        setCategories(categoriesData);

        //Загрузка товаров
        const productsResponse = await fetch(`${serverConfig}/products`);
        const productsData = await productsResponse.json();
        console.log('Loaded products:', productsData); // Логируем полученные данные
        setProducts(productsData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

        // const newsResponse = await fetch(`${serverConfig}/news`);
        // const newsData = await newsResponse.json();
        // setNews(newsData);
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
  const [sortOrder, setSortOrder] = useState('asc'); // Состояние для порядка сортировки

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
    setCurrentPage(0); // Сбрасываем страницу при изменении сортировки
  };

  const offset = currentPage * itemsPerPage;

  // Сортировка продуктов
  const sortedProducts = [...productsInCategory].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; // По возрастанию цены
    } else {
      return b.price - a.price; // По убыванию цены
    }
  });

  const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.categoryName}>
            <span>
              {selectedCategory
                ? selectedCategory.title
                : 'Категория не найдена'}
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
                    className={classes.rightBlockProductsCard}
                    key={product.id}
                  >
                    {product.img.map((el) => {
                      <img src={`${}`}
                    })}
                    <span>{product.type}</span>
                    <span>
                      {product.availability ? 'В наличии' : 'Нет в наличии'}
                    </span>
                    <span>{product.name}</span>
                    <span>{product.price} ₽</span>
                    <button>В корзину</button>
                  </div>
                ))}
              </div>
              <ReactPaginate
                previousLabel={
                  <span className={classes.arrow}>← Предыдущая</span>
                }
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
    </>
  );
}

export default CategoryPage;
