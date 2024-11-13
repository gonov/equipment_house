import React from 'react';
import classes from './ReadySolutionsPage.module.css';
import {businessSolutions} from '../Bd'

function ReadySolutionsPage({ children, ...props }) {
  return (
    <>
      <div className={classes.container}>
        <span>Готовые решения для бизнеса</span>
        {businessSolutions.map((el) => (
          <div className={containerBusinessCard}></div>
        ))}
      </div>
    </>
  );
}

export default ReadySolutionsPage;
