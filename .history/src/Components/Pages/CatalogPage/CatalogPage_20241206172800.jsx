import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { categories } from '../Bd';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

function CatalogPage({ children, ...props }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        const categoriesResponse = await fetch(`${serverConfig}/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        setCategories(categoriesData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

        // const newsResponse = await fetch(`${serverConfig}/news`);
        // const newsData = await newsResponse.json();
        // setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.catalogName}>
          <span>Каталог</span>
        </div>
        <div className={classes.catalogMenu}>
        {categories
        .slice(0, 12) // Ограничиваем список до 12 элементов
        .map((category) => (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            className={classes.catalogMenuCard}
          >
            <span>{category.title}</span>
            {category.img && category.img[0] ? (
              <img
                src={`${uploadsConfig}${category.img[0]}`}
                alt={category.title}
              />
            ) : (
              <img
                src="default-image.jpg" // Путь к изображению по умолчанию, если img не задано
                alt="default"
              />
            )}
          </Link>
        ))}
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default CatalogPage;
