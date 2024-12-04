import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';
import { busSolutions, swipeBlock1 } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';
import serverConfig from '../../../../serverConfig';

export default function Home_Page({ children, ...props }) {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        const productsResponse = await fetch(`${serverConfig}/products`);
        const productsData = await productsResponse.json();

        if (Array.isArray(productsData)) {
          setProducts(productsData); // Устанавливаем только если это массив
        } else {
          setError('Не удалось загрузить товары');
        }

        // Загрузка новостей
        const newsResponse = await fetch(`${serverConfig}/news`);
        const newsData = await newsResponse.json();
        setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CenterBlock>
      <WidthBlock>
        {/* Слайдеры и другие компоненты */}
        <div className={classes.actionList}>
          <Swiper
            className={classes.sliderBox}
            spaceBetween={70}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 40 },
              1299: { slidesPerView: 4, spaceBetween: 70 },
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={classes.card}>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div>Ошибка или нет товаров для отображения</div>
            )}
          </Swiper>
        </div>

        {/* Остальная разметка для других слайдеров и контента */}
      </WidthBlock>
    </CenterBlock>
  );
}
