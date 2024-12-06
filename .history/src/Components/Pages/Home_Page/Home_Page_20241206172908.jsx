import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCard from '../ui/businessSolutions/BusSolCard';
import { busSolutions, swipeBlock1 } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';
import serverConfig from '../../../../serverConfig';
import { Link, useNavigate } from 'react-router-dom';
import uploadsConfig from '../../../uploadsConfig';

export default function Home_Page({ children, ...props }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [busSolutions, setBusSolutions] = useState([]);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [swiper1, setSwiper1] = useState();
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [swiper2, setSwiper2] = useState();
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [swiper3, setSwiper3] = useState();
  const [activeIndex3, setActiveIndex3] = useState(0);
  const [swiper4, setSwiper4] = useState();
  const [activeIndex4, setActiveIndex4] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    isChecked: false,
  });

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        const productsResponse = await fetch(`${serverConfig}/products`);
        const productsData = await productsResponse.json();
        console.log('Loaded products:', productsData); // Логируем полученные данные
        setProducts(productsData);

        const categoriesResponse = await fetch(`${serverConfig}/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log('Loaded categories:', categoriesData); // Логируем полученные данные
        setCategories(categoriesData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

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
      alert(
        'Пожалуйста, подтвердите согласие на обработку персональных данных.'
      );
      return;
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Форма успешно отправлена!');
        // Сброс формы
        setFormData({
          name: '',
          email: '',
          phone: '',
          comment: '',
          isChecked: false,
        });
      } else {
        alert('Произошла ошибка при отправке формы.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы.');
    }
  };

 

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container1}>
          <Swiper
            className={classes.sliderBox}
            spaceBetween={70}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 1, spaceBetween: 40 },
              1299: { slidesPerView: 1, spaceBetween: 70 },
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Autoplay]}
            onSwiper={setSwiper4}
            onSlideChange={(swiper) => setActiveIndex4(swiper.realIndex)}
          >
            {swipeBlock1.map((el) => (
              <SwiperSlide key={el.id}>
                <div className={classes.swipe1}>
                  <img src={el.backgroundImg} alt={el.title} />
                  <div className={classes.imgSize}>
                    <img src={el.img} alt={el.title} />
                  </div>
                  <div className={classes.container1Mini}>
                    <span>{el.title}</span>
                    <span>{el.description}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            style={{ zIndex: '9999' }}
            onClick={() => swiper4.slidePrev()}
          >
            <img src="/images/left.png" alt="Previous" />
          </button>
          <button
            style={{ zIndex: '9999' }}
            onClick={() => swiper4.slideNext()}
          >
            <img src="/images/right.png" alt="Next" />
          </button>
        </div>

        <div className={classes.container2}>
          <div className={classes.popular}>
            <p>Популярные категории оборудования</p>
          </div>
          <button onClick={() => navigate('/catalog')}>
            <img src="/images/Link(1).png" alt="Catalog" />
          </button>
        </div>

        <div className={classes.catalogMenu}>
        {categories
        .slice(0, 15)
        .map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className={classes.catalogMenuCard}
            >
               <span>{category.title}</span>
              <img src={`${uploadsConfig}${category.img[0]}`} alt={category.title} />
             
            </Link>
          ))}
        </div>

        <div className={classes.actionProduct}>
          <span> Товары по акции </span>
          <div className={classes.buttons}>
            <button>
              <img
                src="/images/Group16.png"
                alt="Previous"
                onClick={() => swiper1.slidePrev()}
              />
            </button>
            <button>
              <img
                src="/images/Group17.png"
                alt="Next"
                onClick={() => swiper1.slideNext()}
              />
            </button>
          </div>
        </div>
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
            onSlideChange={(swiper) => setActiveIndex1(swiper.realIndex)}
          >
            {products
              .map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={classes.card}>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className={classes.newProduct}>
          <span> Новинки </span>
          <div className={classes.buttons}>
            <button>
              <img
                src="/images/Group16.png"
                alt="Previous"
                onClick={() => swiper2.slidePrev()}
              />
            </button>
            <button>
              <img
                src="/images/Group17.png"
                alt="Next"
                onClick={() => swiper2.slideNext()}
              />
            </button>
          </div>
        </div>
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
            onSlideChange={(swiper) => setActiveIndex2(swiper.realIndex)}
          >
            {/* {products
              .filter((product) => product.type.toLowerCase() === 'новинка')
              .map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={classes.card}>
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))} */}
          </Swiper>
        </div>

        <div className={classes.container4}>
          <img src="/images/Rectangle22.png" alt="Background" />
          <div className={classes.solForBus}>
            <div className={classes.textForSolution}>
              <span>
                Готовые решения для бизнеса
                <br />
              </span>
              <span>
                Используя готовые решения, вы можете оптимизировать свой бизнес
                - <br />
              </span>
              <span>
                процессы, повысить качество обслуживания гостей и увеличить
                прибыль.
              </span>
            </div>
            <div className={classes.buttons2}>
              <button>
                <img
                  src="/images/Group16.png"
                  alt="Previous"
                  onClick={() => swiper3.slidePrev()}
                />
              </button>
              <button>
                <img
                  src="/images/Group17.png"
                  alt="Next"
                  onClick={() => swiper3.slideNext()}
                />
              </button>
            </div>
          </div>
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
              onSlideChange={(swiper) => setActiveIndex3(swiper.realIndex)}
            >
              {/* {busSolutions.map((busSol) => (
                <SwiperSlide key={busSol.id}>
                  <div className={classes.busSolCard}>
                    <BusSolCard busSol={busSol} />
                  </div>
                </SwiperSlide>
              ))} */}
            </Swiper>
          </div>
        </div>

        <div className={classes.news}>
          <span>Новости</span>
        </div>
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
            {/* {news.map((oneNews) => (
              <SwiperSlide key={oneNews.id}>
                <div className={classes.oneNewsCard}>
                  <NewsCard oneNews={oneNews} />
                </div>
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>

        <div className={classes.partners}>
          <span>Наши партнеры</span>
        </div>
        <div className={classes.patnersBlock}>
          <img src="/images/slot.png" alt="Partner" />
          <img src="/images/slot.png" alt="Partner" />
          <img src="/images/slot.png" alt="Partner" />
          <img src="/images/slot.png" alt="Partner" />
          <img src="/images/slot.png" alt="Partner" />
          <img src="/images/slot.png" alt="Partner" />
        </div>

        <div className={classes.feedback}>
          <span>Обратная связь</span>
        </div>
        <div className={classes.feedback1}>
          <span>
            Если у вас остались вопросы, вы можете оставить заявку и с Вами
            свяжется наш менеджер{' '}
          </span>
        </div>
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
                required
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
                Отправляя форму, я даю согласие на обработку персональных
                данных, подтверждаю согласие с политикой конфиденциальности.
              </span>
              <button type="submit">Отправить</button>
            </div>
          </form>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}
