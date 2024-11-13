import React from 'react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCard from '../ui/businessSolutions/BusSolCard';
import { products, busSolutions, news } from '../Bd';
import NewsCard from '../ui/newsCard/NewsCard';
import { Checkbox } from '@mui/material';

export default function Home_Page({ children, ...props }) {
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
              .filter((product) => product.type.toLowerCase() === 'хит')
              .map((product) => (
                <div key={product.id} className={classes.card}>
                  <ProductCard product={product} key={product.id} />
                </div>
              ))}
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
            <div className={classes.inputBlock1}>
              <input
                type="text"
                placeholder="ФИО"
                className={classes.inpName}
              />
              <input
                type="email"
                placeholder="E-mail"
                className={classes.inpEmail}
              />
            </div>
            <div className={classes.inputBlock2}>
              <input
                type="number"
                placeholder="Телефон"
                className={classes.inpPhone}
              />
              <input
                type="text"
                placeholder="Комментарий"
                className={classes.inpComment}
              />
            </div>
            <div className={classes.send}>
              <div>
              <Checkbox></Checkbox>
              <span>
                Отправляя форму, я даю согласие на обработку персональных{' '}
                <br></br>
                данных, подтверждаю согласие с политикой конфиденциальности
              </span>
              <button>Отправить</button>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}
