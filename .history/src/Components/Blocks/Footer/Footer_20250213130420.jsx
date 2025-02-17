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
      {' '}
      {/* Применяем класс */}
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
              <span>Гастроемкости</span>
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
              <span onClick={() => handleNavigate('/catalog')}>Каталог</span>
              <span onClick={() => handleNavigate('/news')}>Новости</span>
              <span onClick={() => handleNavigate('/about')}>О компании</span>
              <span onClick={() => handleNavigate('/business-solutions')}>
                Готовые решения для бизнеса
              </span>
            </div>
            <div className={classes.container1Contacts}>
              <p>Контакты</p>

              {/* Кликабельный номер телефона */}
              <a href="tel:+79283804146">
                <span>8-928-380-41-46</span>
              </a>

              {/* Кликабельный email */}
              <a href="mailto:42-42@mail.ru">
                <span>oborud09@mail.ru</span>
              </a>

              <span>Режим работы: Пн-Пт 09:00-19:00</span>
            </div>
          </div>
          <div className={classes.container2}>
            <span>Пользовательское соглашение</span>
            <span>Политика конфиденциальности</span>
            <img
              src="/images/alazar.png"
              alt="Логотип"
              onClick={() =>
                (window.location.href = 'https://alazarstudio.ru/')
              }
            />
          </div>
        </WidthBlock>
      </CenterBlock>
    </div>
  );
}

export default Footer;
