import React from 'react';
import classes from './ReadySolutionsPage.module.css';
import { businessSolutions } from '../Bd';

function ReadySolutionsPage({ children, ...props }) {
  return (
    <>
    <CenterBlock>
    <WidthBlock>
      <div className={classes.container}>
        <span>Готовые решения для бизнеса</span>
        {businessSolutions.map((el) => (
          <div key={el.id} className={classes.containerBusinessCard}>
            <img src={el.img} alt="" />
            <span>{el.type}</span>
            <span>{el.title}</span>
            <span>{el.price}</span>
            <button>Подробнее</button>
          </div>
        ))}
      </div>
      </WidthBlock>
</CenterBlock>
    </>
  );
}

export default ReadySolutionsPage;


