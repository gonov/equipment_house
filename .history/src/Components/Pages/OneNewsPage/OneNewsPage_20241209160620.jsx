import React, { useEffect, useState } from 'react';
import classes from './OneNewsPage.module.css';
import { useParams } from 'react-router-dom';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';
// import { news } from '../Bd';

function OneNewsPage({ children, ...props }) {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        // const categoriesResponse = await fetch(`${serverConfig}/categories`);
        // const categoriesData = await categoriesResponse.json();
        // console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        // setCategories(categoriesData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

        const newsResponse = await fetch(`${serverConfig}/news`);
        const newsData = await newsResponse.json();
        setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const selectedNews = news.find((item) => item.id === parseInt(id));

  if (!selectedNews) {
    <div>Новость не найдена</div>;
  }

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <img src={`${uploadsConfig}selectedNews.img`} alt="" />
            <span>{selectedNews.title}</span>
            <span>{selectedNews.description}</span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneNewsPage;
