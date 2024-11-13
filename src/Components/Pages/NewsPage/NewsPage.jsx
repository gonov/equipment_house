import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate
import classes from './NewsPage.module.css';
import { news } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 12; // Количество новостей на странице

function NewsPage({ children, ...props }) {
  const navigate = useNavigate(); // Инициализируем navigate
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentNews = news.slice(offset, offset + itemsPerPage);

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`); // Перенаправляем на страницу с деталями новости
  };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.news}>Новости</div>
          <div className={classes.container}>
            {currentNews.map((oneNews) => (
              <div className={classes.oneNewsCard} key={oneNews.id} onClick={() => handleNewsClick(oneNews.id)}>
                <NewsCard oneNews={oneNews} />
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={<span className={classes.arrow}>← Предыдущая</span>}
            nextLabel={<span className={classes.arrow}>Следующая →</span>}
            breakLabel={'...'}
            pageCount={Math.ceil(news.length / itemsPerPage)}
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

export default NewsPage;
