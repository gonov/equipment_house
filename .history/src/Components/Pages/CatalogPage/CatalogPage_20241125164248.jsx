import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function CatalogPage({ children, ...props }) {
  const [categories, setCategories] = useState([]); // Состояние для категорий
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
  
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
      }
    };
  
    fetchCategories();
  }, []);
  

  if (isLoading) {
    return <div>Загрузка...</div>; // Отображение индикатора загрузки
  }

  if (error) {
    return <div>Ошибка: {error}</div>; // Отображение ошибки
  }

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
