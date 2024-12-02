import React from 'react';
import classes from './NewsCard.module.css';


function NewsCard({ oneNews }) {
  return (
    <>
      <div key={oneNews.id} className={classes.newsContainer}>
        <div className={classes.newsContainer_img}>
          <img src={``} alt="" />
        </div>
        <span>{oneNews.date}</span>
        <span>{oneNews.description}</span>
      </div>
    </>
  );
}

export default NewsCard;
