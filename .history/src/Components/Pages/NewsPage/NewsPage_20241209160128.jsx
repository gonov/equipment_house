import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate
import classes from './NewsPage.module.css';
// import { news } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ReactPaginate from 'react-paginate';
import serverConfig from '../../../../serverConfig';

const itemsPerPage = 12; // Количество новостей на странице

function NewsPage({ children, ...props }) {
  const navigate = useNavigate(); // Инициализируем navigate
  const [currentPage, setCurrentPage] = useState(0);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        const categoriesResponse = await fetch(`${serverConfig}/news`);
        const news = await categoriesResponse.json();
        console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        setNews(categoriesData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

        // const newsResponse = await fetch(`${serverConfig}/news`);
        // const newsData = await newsResponse.json();
        // setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
