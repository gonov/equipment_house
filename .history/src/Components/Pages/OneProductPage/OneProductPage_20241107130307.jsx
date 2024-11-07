import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { products } from '../Bd';

function OneProductPage({ children, ...props }) {
  const { productId } = useParams();

const product

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <span className={classes.prodName}>{products}</span>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
