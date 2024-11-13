import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function OneProductPage({ children, ...props }) {

const {productId}

  return <>
  <CenterBlock>
    <WidthBlock>
      <span className={classes.prodName}>
      {produ}
      </span>
    </WidthBlock>
  </CenterBlock>
  </>;
}

export default OneProductPage;
