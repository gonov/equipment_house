import React from 'react';
import classes from './ReadySolutionsPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { businessSolutions } from '../Bd';
import BusSolCard from '../ui/businessSolutions/BusSolCard';

function ReadySolutionsPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <span>Готовые решения для бизнеса</span>
          <div className={classes.container}>
            {businessSolutions.map((el) => (
             <
              // <div key={el.id} className={classes.containerBusinessCard}>
              //   <img src={el.img} alt="" />
              //   <span>{el.type}</span>
              //   <span>{el.title}</span>
              //   <span>{el.price}</span>
              //   <button>Подробнее</button>
              // </div>
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ReadySolutionsPage;
