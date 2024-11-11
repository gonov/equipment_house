import React from 'react';
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { categories } from '../Bd';

function CatalogPage({ children, ...props }) {
  return <>
  <CenterBlock>
    <WidthBlock>
      <div className={classes.catalogName}>
        <span>Каталог</span>
      </div>
      <div className={classes.catalogMenu}>
        {categories.map((category) => (
          <div key={category.id} className={classes.catalogMenuCard}>
            <img src={category.img}/>
            <span>{category.title}</span>
          </div>
        ))}
      </div>
    </WidthBlock>
  </CenterBlock>
  </>;
}

export default CatalogPage;
