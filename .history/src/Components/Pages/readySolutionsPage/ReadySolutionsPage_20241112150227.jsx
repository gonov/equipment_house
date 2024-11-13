import React, { useState } from 'react';
import classes from './ReadySolutionsPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { businessSolutions } from '../Bd';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

const itemsPerPage = 12; // Количество решений на странице

function ReadySolutionsPage({ children, ...props }) {
 const history

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentSolutions = businessSolutions.slice(
    offset,
    offset + itemsPerPage
  );

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <span className={classes.pageName}>Готовые решения для бизнеса</span>
          <div className={classes.container}>
            {currentSolutions.map((el) => (
              <div key={el.id} className={classes.containerBusinessCard}>
                <img src={el.img} alt="" />
                <span>{el.type ? 'В наличии' : 'Под заказ'}</span>
                <span>{el.title}</span>
                <span>{el.price} ₽</span>
                <button>Подробнее</button>
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={<span className={classes.arrow}>← Предыдущая</span>}
            nextLabel={<span className={classes.arrow}>Следующая →</span>}
            breakLabel={'...'}
            pageCount={Math.ceil(businessSolutions.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={classes.pagination}
            activeClassName={classes.active}
            previousClassName={classes.previous}
            nextClassName={classes.next}
            pageClassName={classes.page}
          />
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ReadySolutionsPage;
