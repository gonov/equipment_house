import React from 'react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

export default function Home_Page() {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container1}>
            <img src="/images/Group24.png" alt=""></img>
            <img src="/images/plate.png" alt=""></img>
            <p>Поставщик профессионального кухонного оборудования в СКФО</p>
            <button>
              <img src="/images/left.png" alt=""></img>
            </button>
            <button>
              <img src="/images/right.png" alt=""></img>
            </button>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}
