import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { businessSolutions, products, busSolutions } from '../Bd';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCard from '../ui/businessSolutions/BusSolCard';
import BusSolCardDone from '../ui/BusSolCardDone/BusSolCardDone';

function OneSolutionPage({ children, ...props }) {
  const { id } = useParams();
  const oneSolution = businessSolutions.find((el) => el.id === parseInt(id));

  if (!oneSolution) {
    return <div>Товар не найден</div>;
  }

  const solProduct = products.filter(
    (product) => product.businessSolutionsId === parseInt(id)
  );

  const navigate = useNavigate(); // Используйте useNavigate
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentSolutions = businessSolutions.slice(
    offset,
    offset + itemsPerPage
  );

  const handleProductClick = (id) => {
    navigate(`/solutions/${id}`); // Переход на страницу деталей товара
  };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div key={oneSolution.id} className={classes.container1}>
            <span>{oneSolution.title}</span>
            <img src={oneSolution.img} />
            <span>Комплектация</span>
          </div>
          <div className={classes.container2}>
            {solProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <span className={classes.naming2}>Похожие решения</span>
          <div className={classes.container3}>
            {busSolutions.map((busSol) => (
              <BusSolCardDone key={id} busSol={busSol} />
            ))}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
