import React from 'react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';
import BusSolCard from '../ui/businessSolutions/BusSolCard';
import products from '../Bd';

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
            {products.map((product) => (
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
            {products.map((product) => (
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
             {bus}
              <BusSolCard />
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}
