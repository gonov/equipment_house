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
  
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId); // Состояние для выбранной категории
  const productsInCategory = getProductsByCategory(selectedCategoryId);
  const [currentPage, setCurrentPage] = useState(0);

  const selectedCategory = categories.find(categor)

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id); // Обновляем выбранную категорию
    setCurrentPage(0); // Сбрасываем текущую страницу на первую
  };

  const offset = currentPage * itemsPerPage;
  const currentProducts = productsInCategory.slice(offset, offset + itemsPerPage);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.categoryName}>
            <span>{.title}</span>
            {/* Название категории */}
          </div>
          <div className={classes.container}>
            <div className={classes.leftBlock}>
              <span className={classes.leftBlockName}>Каталог</span>
              {categories.map((category) => (
                <div key={category.id} className={classes.leftBlockCategory} onClick={() => handleCategoryClick(category.id)}>
                  <span>{category.title}</span>
                </div>
              ))}
            </div>
            <div className={classes.rightBlock}>
              <div className={classes.rightBlockFilter}>
                <button>По убыванию цены</button>
                <button>По возрастанию цены</button>
              </div>
              <div className={classes.rightBlockProducts}>
                {currentProducts.map((product) => (
                  <div className={classes.rightBlockProductsCard} key={product.id}>
                    {/* <ProductCard product={product}/> */}
                    <img src={product.img1} alt={product.name} />
                    <span>{product.type}</span>
                    <span>{product.availability ? 'В наличии' : 'Нет в наличии'}</span>
                    <span>{product.name}</span>
                    <span>{product.price} ₽</span>
                    <button>В корзину</button>
                  </div>
                ))}
              </div>
              <ReactPaginate
                previousLabel={<span className={classes.arrow}>← Предыдущая</span>}
                nextLabel={<span className={classes.arrow}>Следующая →</span>}
                breakLabel={'...'}
                pageCount={Math.ceil(productsInCategory.length / itemsPerPage)}
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
