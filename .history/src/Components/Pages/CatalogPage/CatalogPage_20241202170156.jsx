import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { categories } from '../Bd';



function CatalogPage({ children, ...props }) {
  const [categories, setCategories]
  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.catalogName}>
          <span>Каталог</span>
        </div>
        <div className={classes.catalogMenu}>
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id} className={classes.catalogMenuCard}>
              <img src={category.img} alt={category.title} />
              <span>{category.title}</span>
            </Link>
          ))}
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default CatalogPage;
