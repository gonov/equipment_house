import React from 'react';
import classes from './Home_Page.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProductCard from '../ui/productCard/ProductCard';

const products = () => {
  [  {
      id: 1,
      name: 'Мясорубка 1000ватт',
      price: 1000,
      img: '/images/group3.png'
    }]
  }

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
<div className={classes.productLi}
            <ProductCard {products}  />
        </WidthBlock>
      </CenterBlock>
    </>
  );
}
