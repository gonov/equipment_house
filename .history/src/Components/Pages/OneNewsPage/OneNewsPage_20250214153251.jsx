import React, { useEffect, useState } from 'react';
import classes from './OneNewsPage.module.css';
import { Link, useParams } from 'react-router-dom';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import serverConfig from '../../../../serverConfig';
import uploadsConfig from '../../../uploadsConfig';

function OneNewsPage({ children, ...props }) {
  const { id } = useParams(); // получаем id из URL
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка данных
        const newsResponse = await fetch(`${serverConfig}/news/${id}`); // правильно формируем URL
        const newsData = await newsResponse.json();
        setNews([newsData]); // предполагаем, что API возвращает одну новость
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // зависимости, чтобы загрузить данные при изменении id

  // Отображение загрузки
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Отображение ошибки
  if (error) {
    return <div>{error}</div>;
  }

  // Выбор новости по id
  const selectedNews = news.length > 0 ? news[0] : null; 

  if (!selectedNews) {
    return <div>Новость не найдена</div>; // если новость не найдена
  }

  return (
    <CenterBlock>
      <WidthBlock>
                <div className={classes.nav}>
                  <Link to="/">Главная</Link> &gt;
                  <Link to="/news"> Новости</Link> &gt;
                  <span> {currentNews .title}</span>
                </div>
        <div className={classes.container}>
          <img src={`${uploadsConfig}${selectedNews.img}`} alt={selectedNews.title} />
          <h1>{selectedNews.title}</h1>
          <p>{selectedNews.description}</p>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default OneNewsPage;
