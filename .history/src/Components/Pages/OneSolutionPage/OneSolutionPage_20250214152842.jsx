import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useNavigate, useParams } from 'react-router-dom';
import { businessSolutions, products, busSolutions } from '../Bd';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCardDone from '../ui/BusSolCardDone/BusSolCardDone';

function OneSolutionPage({ children, ...props }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const oneSolution = businessSolutions.find((el) => el.id === parseInt(id));

  if (!oneSolution) {
    return <div>Товар не найден</div>;
  }

  const solProduct = products.filter(
    (product) => product.businessSolutionsId === oneSolution.id
  );

  const handleProductClick = (productId) => {
    navigate(`/solutions/${productId}`);
  };

  const getRandomBusSolutions = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomBusSolutions = getRandomBusSolutions(busSolutions, 3);

  return (
    <CenterBlock>
      <WidthBlock>
        <div key={oneSolution.id} className={classes.container1}>
          <span className={classes.title}>{oneSolution.title}</span>
          <img
            className={classes.image}
            src={oneSolution.img}
            alt={oneSolution.title}
          />
          <span className={classes.complectation}>Комплектация:</span>
        </div>
        <div className={classes.container2}>
          {/* {solProduct.length > 0 ? (
            solProduct.map((product) =>
              product && product.img1 ? ( // ✅ Проверка на существование `img1`
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product.id)}
                />
              ) : (
                <span key={product?.id || Math.random()} className={classes.none}>
                  У продукта нет изображения
                </span>
              )
            )
          ) : (
            <span className={classes.none}>
              Нет доступных продуктов для этого решения.
            </span>
          )} */}
        </div>
        <span className={classes.naming2}>Похожие решения</span>
        <div className={classes.container3}>
          {randomBusSolutions.map((busSol) =>
            busSol ? (
              <BusSolCardDone
                key={busSol.id}
                busSol={busSol}
                handleProductClick={handleProductClick}
              />
            ) : null
          )}
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default OneSolutionPage;
