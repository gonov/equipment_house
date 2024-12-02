import React from 'react';
import classes from './NewsCard.module.css';
import uploadsConfig from '../../../../uploadsConfig';


function NewsCard({ oneNews }) {
  return (
    <>
      <div key={oneNews.id} className={classes.newsContainer}>
        <div className={classes.newsContainer_img}>
          <img src={`${uploadsConfig}${oneNews.img[0]}`} alt="" />
        </div>
        <span>{oneNews.date}</span>
        <span>{oneNews.description}</span>
      </div>
    </>
  );
}

export default NewsCard;
