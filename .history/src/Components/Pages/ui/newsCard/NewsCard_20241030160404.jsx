import React from 'react';
import classes from './NewsCard.module.css';

function NewsCard({ oneNews }) {
  return (
    <>
      <div className={classes.newsContainer}>
        <div>

        <img src="/images/123.png" alt="" />
        </div>
        <span>{oneNews.date}</span>
        <span>{oneNews.description}</span>
      </div>
    </>
  );
}

export default NewsCard;
