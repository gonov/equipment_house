import React from 'react';
import classes from './NewsCard.module.css';

function NewsCard({ oneNews }) {
  return (
    <>
      <div className={classes.newsContainer}>
        < src="/images/123.png" alt="">
        <span>{oneNews.date}</span>
        <span>{oneNews.description}</span>
      </div>
    </>
  );
}

export default NewsCard;
