import React, { useState } from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { categories, getProductsByCategory } from '../Bd';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 12; // Количество продуктов на странице

function CategoryPage({ children, ...props }) {
  const { id } = useParams();
  const categoryId = parseInt(id);

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
                    <img src={product.img1} alt={product.name} />
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
