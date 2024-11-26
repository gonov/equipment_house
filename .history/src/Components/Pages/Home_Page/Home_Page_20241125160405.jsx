import React, { useState, useEffect } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCard from '../ui/businessSolutions/BusSolCard';
import NewsCard from '../ui/newsCard/NewsCard';

export default function Home_Page() {
  const [products, setProducts] = useState([]);
  const [busSolutions, setBusSolutions] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [swiper1, setSwiper1] = useState();
  const [swiper2, setSwiper2] = useState();
  const [swiper3, setSwiper3] = useState();
  const [swiper4, setSwiper4] = useState();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    isChecked: false,
  });

  // Загрузка данных из API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const busSolutionsResponse = await fetch('/api/businessSolutions');
        const busSolutionsData = await busSolutionsResponse.json();
        setBusSolutions(busSolutionsData);

        const newsResponse = await fetch('/api/news');
        const newsData = await newsResponse.json();
        setNews(newsData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.isChecked) {
      alert('Пожалуйста, подтвердите согласие на обработку персональных данных.');
      return;
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Форма успешно отправлена!');
        setFormData({ name: '', email: '', phone: '', comment: '', isChecked: false });
      } else {
        alert('Произошла ошибка при отправке формы.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы.');
    }
  };

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CenterBlock>
      <WidthBlock>
        {/* Товары по акции */}
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
            onSwiper={setSwiper1}
          >
            {products
              .filter((product) => product.type.toLowerCase() === 'хит')
              .map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={classes.card}>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Новинки */}
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
            onSwiper={setSwiper2}
          >
            {products
              .filter((product) => product.type.toLowerCase() === 'новинка')
              .map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={classes.card}>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Готовые решения для бизнеса */}
        <div className={classes.busSolContainer}>
          <Swiper
            className={classes.sliderBox}
            spaceBetween={70}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 40 },
              1299: { slidesPerView: 3, spaceBetween: 70 },
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Autoplay]}
            onSwiper={setSwiper3}
          >
            {busSolutions.map((busSol) => (
              <SwiperSlide key={busSol.id}>
                <div className={classes.busSolCard}>
                  <BusSolCard busSol={busSol} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Новости */}
        <div className={classes.newsCard}>
          <Swiper
            className={classes.sliderBox}
            spaceBetween={70}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 40 },
              1299: { slidesPerView: 3, spaceBetween: 70 },
            }}
            loop={true}
          >
            {news.map((oneNews) => (
              <SwiperSlide key={oneNews.id}>
                <div className={classes.oneNewsCard}>
                  <NewsCard oneNews={oneNews} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Форма обратной связи */}
        <div className={classes.feedbackBlock}>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputBlock1}>
              <input
                type="text"
                name="name"
                placeholder="ФИО"
                className={classes.inpName}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className={classes.inpEmail}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.inputBlock2}>
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                className={classes.inpPhone}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="comment"
                placeholder="Комментарий"
                className={classes.inpComment}
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <div className={classes.send}>
              <label className={classes.custom_checkbox}>
                <input
                  type="checkbox"
                  name="isChecked"
                  checked={formData.isChecked}
                  onChange={handleChange}
                />
                <span className={classes.checkmark}></span>
              </label>
              <span>
                Отправляя форму, я даю согласие на обработку персональных данных.
              </span>
              <button type="submit">Отправить</button>
            </div>
          </form>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}
