import React from 'react';
import classes from './Footer.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Footer({ children, ...props }) {
  return (
    <>
      <div className={classes.footer}>
        <CenterBlock>
          <WidthBlock>
            <div className={classes.container1}>
            <div className={classes.container1Equipment}>
              <p>Оборудование</p>
              <span>Тепловое</span>
              <span>Холодильное</span>
              <span>Электромеханическое</span>
              <span>Посудомоечное</span>
              <span>Нейтральное</span>
              <span>Линии раздачи</span>
            </div>
            <div className={classes.container1Accessories}>
              <p>Аксессуары</p>
              <span>Моющие средства</span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={classes.container1Info}>
              <p>Информация</p>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={classes.container1Contacts}>
              <p>Контакты</p>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={classes.container2}>
                <span>Пользовательское соглашение</span>
                <span>Политика конфиденциальности</span>
                <i
            </div>
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Footer;
