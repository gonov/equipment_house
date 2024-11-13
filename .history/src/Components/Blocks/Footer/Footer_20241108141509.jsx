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
              <span>Моющие средства</span>
              <span>Гастоемкости</span>
              <span>Противни и решетки</span>
              <span>Для пищеварочных котлов</span>
              <span>Для тестораскаточных машин</span>
              <span>Для посудомоечных машин</span>
              <span>Для линий раздачи</span>
              <span>Диски для овощерезок</span>
              <span>Стерилизаторы</span>
             
            </div>
            <div className={classes.container1Info}>
              <p>Информация</p>
              <span>Каталог</span>
              <span>Новости</span>
              <span>О компании</span>
              <span>Готовые решения для бизнеса</span>
            </div>
            <div className={classes.container1Contacts}>
              <p>Контакты</p>
              <span>8-928-380-41-46</span>
              <span>42-42@mail.ru</span>
              <span>Режим работы: </span>
              <span></span>
            </div>
            <div className={classes.container2}>
                <span>Пользовательское соглашение</span>
                <span>Политика конфиденциальности</span>
                <img src='/images/.png'></img>
            </div>
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Footer;
