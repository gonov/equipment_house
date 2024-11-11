import React from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';

function CategoryPage({ children, ...props }) {
  // const { id } = useParams();

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
              <span>Каталог</span>
              {ca}
            </div>
            <div className={classes.rightBlock}></div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default CategoryPage;