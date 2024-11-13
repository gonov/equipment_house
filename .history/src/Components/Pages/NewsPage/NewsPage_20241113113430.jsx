import React from 'react';
import classes from './NewsPage.module.css';
import {news} from '/'

function NewsPage({ children, ...props }) {
  return <>
  <div className={classes.news}>Новости</div>
  <div className={classes.container}>
    {news}
  </div>
  </>;
}

export default NewsPage;
