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

  // Проверка на наличие решения
  if (!oneSolution) {
    return <div>Товар не найден</div>;
  }

  // Фильтрация продуктов по businessSolutionsId
  const solProduct = products.filter(
    (product) => product.businessSolutionsId === oneSolution.id
  );

  // Функция для обработки клика по продукту
  const handleProductClick = (productId) => {
    navigate(`/solutions/${productId}`); // Переход на страницу деталей товара
  };

  // Функция для получения случайных элементов
  const getRandomBusSolutions = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Получаем 3 случайных решения
  const randomBusSolutions = getRandomBusSolutions(busSolutions, 3);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div key={oneSolution.id} className={classes.container1}>
            <span className={classes.title}>{oneSolution.title}</span>
            <img className={classes.image} src={oneSolution.img} alt={oneSolution.title} />
            <span className={classes.complectation}>Комплектация:</span>
          </div>
          <div className={classes.container2}>
            {solProduct.length > 0 ? (
              solProduct.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
              ))
            ) : (
              <span className={classes.None}>Нет доступных продуктов для этого решения.</span>
            )}
          </div>
          <span className={classes.naming2}>Похожие решения</span>
          <div className={classes.container3}>
            {randomBusSolutions.map((busSol) => (
              <BusSolCardDone key={busSol.id} busSol={busSol} handleProductClick={handleProductClick} />
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
