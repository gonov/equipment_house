import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import classes from './Footer.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Footer({ ...props }) {
  const navigate = useNavigate(); // Инициализация хука useNavigate

  // Обработчики кликов для навигации
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={classes.footer}>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container1}>
            <div className={classes.container1Equipment}>
              <p>Оборудование</p>
              <span onClick={() => handleNavigate('/equipment/heat')}>Тепловое</span>
              <span onClick={() => handleNavigate('/equipment/cold')}>Холодильное</span>
              <span onClick={() => handleNavigate('/equipment/electromechanical')}>Электромеханическое</span>
              <span onClick={() => handleNavigate('/equipment/dishwashing')}>Посудомоечное</span>
              <span onClick={() => handleNavigate('/equipment/neutral')}>Нейтральное</span>
              <span onClick={() => handleNavigate('/equipment/serving-lines')}>Линии раздачи</span>
            </div>
            <div className={classes.container1Accessories}>
              <p>Аксессуары</p>
              <span onClick={() => handleNavigate('/accessories/cleaning')}>Моющие средства</span>
              <span onClick={() => handleNavigate('/accessories/containers')}>Гастроемкости</span>
              <span onClick={() => handleNavigate('/accessories/trays')}>Противни и решетки</span>
              <span onClick={() => handleNavigate('/accessories/boilers')}>Для пищеварочных котлов</span>
              <span onClick={() => handleNavigate('/accessories/dough-machines')}>Для тестораскаточных машин</span>
              <span onClick={() => handleNavigate('/accessories/dishwashers')}>Для посудомоечных машин</span>
              <span onClick={() => handleNavigate('/accessories/serving-lines')}>Для линий раздачи</span>
              <span onClick={() => handleNavigate('/accessories/vegetable-cutters')}>Диски для овощерезок</span>
              <span onClick={() => handleNavigate('/accessories/sterilizers')}>Стерилизаторы</span>
            </div>
            <div className={classes.container1Info}>
              <p>Информация</p>
              <span onClick={() => handleNavigate('/catalog')}>Каталог</span>
              <span onClick={() => handleNavigate('/news')}>Новости</span>
              <span onClick={() => handleNavigate('/about')}>О компании</span>
              <span onClick={() => handleNavigate('/business-solutions')}>Готовые решения для бизнеса</span>
            </div>
            <div className={classes.container1Contacts}>
              <p>Контакты</p>
              <span>8-928-380-41-46</span>
              <span>42-42@mail.ru</span>
              <span>Режим работы: Пн-Пт 09:00-19:00</span>
            </div>
          </div>
          <div className={classes.container2}>
            <span onClick={() => handleNavigate('/user-agreement')}>Пользовательское соглашение</span>
            <span onClick={() => handleNavigate('/privacy-policy')}>Политика конфиденциальности</span>
            <img src="/images/alazar.png" alt="Логотип" />
          </div>
        </WidthBlock>
      </CenterBlock>
    </div>
  );
}

export default Footer;
