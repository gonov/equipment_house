import React from 'react';
import classes from './NewsCard.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function NewsCard({ oneNews }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div key={oneNews.id} className={classes.newsContainer}>
            <div className={classes.newsContainer_img}>
              <img src={oneNews.img} alt="" />
            </div>
            <span>{oneNews.date}</span>
            <span>{oneNews.description}</span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default NewsCard;