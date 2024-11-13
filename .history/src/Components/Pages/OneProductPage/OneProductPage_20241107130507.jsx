import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { products } from '../Bd';

function OneProductPage({ children, ...props }) {
  const { productId } = useParams();

  const product = products.find((prod) => prod.id === productId);

  if (!product) {
    return (
      <CenterBlock>
        <WidthBlock>
          <h1>Продукт не найден</h1>
        </WidthBlock>
      </CenterBlock>
    );
  }

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <span className={classes.prodName}>{product.name}</span>
          <div className={classes.container1}>
            <
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
