import React from 'react';
import classes from './NewsPage.module.css';
import { news } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function NewsPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.news}>Новости</div>
          <div className={classes.container}>
            {news.map((oneNews) => (
              <div className={classes.oneNewsCard} key={oneNews.id}>
                <NewsCard oneNews={oneNews} />
              </div>
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default NewsPage;
