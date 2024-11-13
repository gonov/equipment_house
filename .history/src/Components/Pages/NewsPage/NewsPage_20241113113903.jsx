import React from 'react';
import classes from './NewsPage.module.css';
import {news} from '../Bd'
import NewsCard from '../ui/newsCard/NewsCard';

function NewsPage({ children, ...props }) {
  return <>
  <div className={classes.news}>Новости</div>
  <div className={classes.container}>
    {news.map((oneNews) => (
      <
      <NewsCard oneNews={oneNews} key={oneNews.id}/>
    ))}
  </div>
  </>;
}

export default NewsPage;
