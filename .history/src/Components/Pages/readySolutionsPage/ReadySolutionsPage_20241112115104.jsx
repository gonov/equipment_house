import React from 'react';
import classes from './ReadySolutionsPage.module.css';

function ReadySolutionsPage({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <span>Готовые решения для бизнеса</span>
        {busin}
      </div>
    </>
  );
}

export default ReadySolutionsPage;
