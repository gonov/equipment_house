import React from 'react';
import classes from './NewsPage.module.css';

function NewsPage({ children, ...props }) {
  return <>
  <div className={classes.news}></div>
  </>;
}

export default NewsPage;