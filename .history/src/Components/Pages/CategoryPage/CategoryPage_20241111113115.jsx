import React from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function CategoryPage({ children, ...props }) {
  return <>
    <CenterBlock>
    <WidthBlock>
      <div className={classes.catalogName}>
        <span>Каталог</span>
      </div>
      <div className={classes.catalogMenu}>
        {catalogElements.map((el) => (
          <div key={el.id} className={classes.catalogMenuCard}>
            <img src={el.img}/>
            <span>{el.title}</span>
          </div>
        ))}
      </div>
    </WidthBlock>
  </CenterBlock>
  </>;
}

export default CategoryPage;
