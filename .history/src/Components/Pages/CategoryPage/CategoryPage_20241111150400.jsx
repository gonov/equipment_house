import React from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { categories, getProductsByCategory, products } from '../Bd';

function CategoryPage({ children, ...props }) {
  const { id } = useParams();
  const categoryId = parseInt(id);

  const productsInCAtegory = getProductsByCategory(categoryId);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.categoryName}>
            {/* <span>{category.name}</span> */}
            Название категории
          </div>
          <div className={classes.container}>
            <div className={classes.leftBlock}>
              <span className={classes.leftBlockName}>Каталог</span>
              {categories.map((category) => (
                <div key={category.id} className={classes.leftBlockCategory}>
                  <span>{category.title}</span>
                </div>
              ))}
            </div>
            <div className={classes.rightBlock}>
              <div className={classes.rightBlockFilter}>
                <button>По убыванию цены</button>
                <button>По возрастанию цены</button>
              </div>
              {productsInCAtegory.map((product) => (
                <div className={classes.rightBlockProductCard} key={product.id}>
                  <img src={product.}
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default CategoryPage;
