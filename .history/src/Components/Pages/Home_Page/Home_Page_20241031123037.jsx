import React, { useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCard from '../ui/businessSolutions/BusSolCard';
import { products, busSolutions, news } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';

export default function Home_Page({ children, ...props }) {
  const [swiper, setSwiper] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isChecked: false,
  });

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
      } else {
        alert('Произошла ошибка при отправке формы.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы.');
    }
  };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container1}>
            <img src="/images/Group24.png" alt=""></img>
            <img src="/images/plate.png" alt=""></img>
            <p>Поставщик профессионального кухонного оборудования в СКФО</p>
            <button>
              <img src="/images/left.png" alt=""></img>
            </button>
            <button>
              <img src="/images/right.png" alt=""></img>
            </button>
          </div>
          {/*  //////////////////////////////////////       */}
          <div className={classes.container2}>
            <div className={classes.popular}>
              <p>Популярные категории оборудования</p>
            </div>
            <button>
              <img src="/images/Link(1).png" alt=""></img>
            </button>
          </div>
          {/*  //////////////////////////////////////       */}
          <div className={classes.container3}>
            <div className={classes.column}>
              <button>
                <img src="/images/Group1.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group6.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group11.png" alt=""></img>
              </button>
            </div>
            <div className={classes.column}>
              <button>
                <img src="/images/Group2.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group7.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group12.png" alt=""></img>
              </button>
            </div>
            <div className={classes.column}>
              <button>
                <img src="/images/Group3.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group8.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group13.png" alt=""></img>
              </button>
            </div>
            <div className={classes.column}>
              <button>
                <img src="/images/Group4.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group9.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group14.png" alt=""></img>
              </button>
            </div>
            <div className={classes.column}>
              <button>
                <img src="/images/Group5.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group10.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group15.png" alt=""></img>
              </button>
            </div>
          </div>
          {/*  //////////////////////////////////////       */}
          <div className={classes.actionProduct}>
            <span> Товары по акции </span>
            <div className={classes.buttons}>
              <button onClick={() =}>
                <img src="/images/Group16.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group17.png" alt=""></img>
              </button>
            </div>
          </div>
          <div className={classes.actionList}>
            <Swiper
              className={classes.sliderBox}
              spaceBetween={70}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1299: {
                  slidesPerView: 4,
                  spaceBetween: 70,
                },
              }}
              direction="horizontal"
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              onSwiper={setSwiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {products
                .filter((product) => product.type.toLowerCase() === 'хит')
                .map((product) => (
                  <div key={product.id} className={classes.card}>
                    <ProductCard product={product} key={product.id} />
                  </div>
                ))}
            </Swiper>
          </div>
          {/*  //////////////////////////////////////       */}
          <div className={classes.newProduct}>
            <span> Новинки </span>
            <div className={classes.buttons}>
              <button>
                <img src="/images/Group16.png" alt=""></img>
              </button>
              <button>
                <img src="/images/Group17.png" alt=""></img>
              </button>
            </div>
          </div>
          <div className={classes.actionList}>
            {products
              .filter((product) => product.type.toLowerCase() === 'новинка')
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
          {/*  //////////////////////////////////////       */}
          <div className={classes.container4}>
            <img src="/images/Rectangle22.png" alt=""></img>
            <div className={classes.solForBus}>
              <div className={classes.textForSolution}>
                <span>
                  Готовые решения для бизнеса<br></br>
                </span>
                <span>
                  Используя готовые решения, вы можете оптимизировать свой
                  бизнес - <br></br>
                </span>
                <span>
                  процессы, повысить качество обслуживания гостей и увеличить
                  прибыль.
                </span>
              </div>
              <div className={classes.buttons2}>
                <button>
                  <img src="/images/left.png" alt=""></img>
                </button>
                <button>
                  <img src="/images/right.png" alt=""></img>
                </button>
              </div>
            </div>
            <div className={classes.busSolContainer}>
              {busSolutions.map((busSol) => (
                <div key={busSol.id} className={classes.busSolCard}>
                  <BusSolCard busSol={busSol} key={busSol.id} />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.news}>
            <span>Новости</span>
          </div>
          <div className={classes.newsCard}>
            {news.map((oneNews) => (
              <div key={oneNews.id} className={classes.oneNewsCard}>
                <NewsCard oneNews={oneNews} key={oneNews.id} />
              </div>
            ))}
          </div>
          <div className={classes.partners}>
            <span>Наши партнеры</span>
          </div>
          <div className={classes.patnersBlock}>
            <img src="/images/partners.png" alt=""></img>
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
                  Отправляя форму, я даю согласие на обработку персональных{' '}
                  <br />
                  данных, подтверждаю согласие с политикой конфиденциальности
                </span>
                <button type="submit">Отправить</button>
              </div>
            </form>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}
