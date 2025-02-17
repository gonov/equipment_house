import React from 'react';
import classes from './NewsCard.module.css';
import uploadsConfig from '../../../../uploadsConfig';

function NewsCard({ oneNews }) {
  // Форматируем дату в читаемый вид
  const formattedDate = new Date(oneNews.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={classes.newsContainer}>
      <div className={classes.newsContainerImg}>
        <img src={`${uploadsConfig}${oneNews.img}`} alt={oneNews.title || "Новость"} />
      </div>
      <div className={classes.newsContainer}
      <span className={classes.newsDate}>{formattedDate}</span>
      <span className={classes.newsDescription}>{oneNews.description}</span>
    </div>
  );
}

export default NewsCard;
