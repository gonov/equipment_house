import React from 'react';
import classes from './NewsCard.module.css';
import uploadsConfig from '../../../../uploadsConfig';
import { useNavigate } from 'react-router-dom';

function NewsCard({ oneNews }) {
  const navigate = useNavigate()
  // Форматируем дату в читаемый вид
  const formattedDate = new Date(oneNews.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={classes.newsContainer} onClick={() => navigate('/news')}>
      <div className={classes.newsContainerImg}>
        <img
          src={`${uploadsConfig}${oneNews.img}`}
          alt={oneNews.title || 'Новость'}
        />
      </div>
      <div className={classes.newsContainerSpan}>
        <span className={classes.newsDate}>{formattedDate}</span>
        <span className={classes.newsDescription}>{oneNews.description}</span>
      </div>
    </div>
  );
}

export default NewsCard;
