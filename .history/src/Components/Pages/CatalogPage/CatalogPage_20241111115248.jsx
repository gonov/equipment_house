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
        {categories.map((el) => (
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

export default CatalogPage;
