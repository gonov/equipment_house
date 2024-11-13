import React from 'react';
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { catalogElements } from '../Bd';

function CatalogPage({ children, ...props }) {
  return <>
  <CenterBlock>
    <WidthBlock>
      <div className={classes.catalog>}>
        <span>Каталог</span>
      </div>
      <div className={classes.catalogMenu}>
        {catalogElements.map((el) => {
          <div className={classes.catalogCard}>
            <img src={el.img}/>
            <span
          </div>
        })}
      </div>
    </WidthBlock>
  </CenterBlock>
  </>;
}

export default CatalogPage;
