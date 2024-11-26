import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function CatalogPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/categories'); // Без авторизации

        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
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
