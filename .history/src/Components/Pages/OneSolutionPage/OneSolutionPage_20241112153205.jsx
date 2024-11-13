import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { businessSolutions, products } from '../Bd';
import ProductCard from '../ui/productCard/ProductCard';

function OneSolutionPage({ children, ...props }) {
  const { id } = useParams();
  const oneSolution = businessSolutions.find((el) => el.id === parseInt(id));

  if (!oneSolution) {
    return <div>Товар не найден</div>;
  }

  const solProduct = products.filter(
    (product) => product.businessSolutionsId === parseInt(id)
  );

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div key={oneSolution.id} className={classes.container}>
            <span className={classes.conatinerSolutionName}>
              {oneSolution.title}
            </span>
            <img
              className={classes.conatinerSolutionImg}
              src={oneSolution.img}
            />
            <span className={classes.conatinerSet}>Комплектация</span>
          </div>
          <div className={classes.container2}>
            {solProduct.map((product) => (
              <div key={product.id} className={classes.container2Card}>
                <img src={product.img1} />
                <span>{product.type}</span>
                <span>{product.availability ? 'В наличии' : 'Нет в наличии'}</span>
                <span>{product.name}</span>
                <span>{product.price} ₽</span>
              </div>
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
