import React from 'react';
import classes from './ReadySolutionsPage.module.css';
import {businessSolutions}

function ReadySolutionsPage({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <span>Готовые решения для бизнеса</span>
        {businessSolutions}
      </div>
    </>
  );
}

export default ReadySolutionsPage;
