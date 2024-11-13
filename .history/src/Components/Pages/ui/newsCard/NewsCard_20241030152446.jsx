import React from 'react';
import classes from './NewsCard.module.css';

function NewsCard({ oneNews }) {
  return <>
  <div className={classes.newsContainer}>
    <img src='/images/123.png' alt=''></img>
    <span>oneNews</span>
  </div>
  </>;
}

export default NewsCard;
