import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { products, characteristics } from '../Bd';

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
          <div className={classes.prodName}>
          <span>{product.name}</span>
          <span> {product.code}</span>
          </div>
          <div className={classes.container1}>
            <img src={product.img}></img>
            <div className={classes.characteristics}>
              <span>{characteristics.article}</span>
              <span>{characteristics.series}</span>
              <span>{characteristics.installation}</span>
              <span>{characteristics.connection}</span>
            </div>
            <div className={classes.summ}>
              <span>Цена без скидки (с НДС)</span>
              <span>{product.price}</span>
              
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneProductPage;
