import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { categories } from '../Bd';

const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // Загрузка товаров
      const categoriesResponse = await fetch(`${serverConfig}/categories`);
      const categoriesData = await categoriesResponse.json();
      console.log('Loaded categories:', categoriesData); // Логируем полученные данные
      setCategories(categoriesData);

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

function CatalogPage({ children, ...props }) {
  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.catalogName}>
          <span>Каталог</span>
        </div>
        <div className={classes.catalogMenu}>
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id} className={classes.catalogMenuCard}>
              <img src={category.img} alt={category.title} />
              <span>{category.title}</span>
            </Link>
          ))}
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default CatalogPage;
