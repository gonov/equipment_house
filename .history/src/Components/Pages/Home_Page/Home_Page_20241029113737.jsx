import React from 'react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

export default function Home_Page() {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
            <div className={classes.container}>
                <img src='/images/rectangle3.png'></img>
            </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}
