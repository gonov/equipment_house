import React, { useState } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
// import HeaderModal from '../../Pages/ui/header/HeaderModal';
import { user } from '../../Pages/Bd';
import { Link, useNavigate } from 'react-router-dom';

function Header({ children, ...props }) {
  const [selectedCity, setSelectedCity] = useState('Черкесск');

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //   const handleSelectCityChange = (event) => {
  //     setSelectedCity(event.target.value);
  //   };

  const cities = [
    { value: 'Черкесск', label: 'Черкесск' },
    { value: 'Москва', label: 'Москва' },
    { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
    // { value: '', label: '' },
    // { value: '', label: '' },
    // { value: '', label: '' },
    // { value: '', label: '' },
  ];

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          {/* начало первого контейнера  */}
          <div className={classes.headerContainer1}>
            <div className={classes.location}>
              <img src="/images/location.png" alt=""></img>
              <span className={classes.cityName}>{selectedCity}</span>
              <img src="/images/Ellipse1.png" alt=""></img>
              <div className={classes.select}>
                {/* <select
              onChange={handleSelectCityChange}
              value={selectedCity}
              className={classes.citySelect}
            >
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  Указать город
                </option>
              ))}
            </select> */}
                <div className={classes.city}>Указать город</div>
              </div>
            </div>
            <ul className={classes.navone}>
              <li>
                <Link to="/catalog"> Каталог </Link>
              </li>
              <li>
                <Link to="/news"> Новости </Link>
              </li>
              <li>
                <Link to="/solution"> Готовые решения для бизнеса </Link>
              </li>
              <li>
                <Link to="/company"> О компании </Link>
              </li>
            </ul>
            <div className={classes.call}>
              <img src="/images/coolicon.png" alt=""></img>
              <h4 className={classes.phone}>8-928-380-41-46</h4>
            </div>
          </div>
          {/* начало второго контейнера  */}
          <div className={classes.headerContainer2}>
            <div className={classes.houseName}>
              <img
                src="/images/home.png"
                alt=""
                onClick={() => (window.location.href = '/')}
              ></img>
            </div>
            <div className={classes.search}>
              <input placeholder="Поиск по названию товара или категории"></input>
              <button>
                <img src="/images/Background.png" alt=""></img>
              </button>
            </div>
            <div className={classes.buttons}>
              <button>
                <img
                  src="/images/cart1.png"
                  alt=""
                  onClick={() => (window.location.href = '/basket')}
                ></img>
              </button>

              <button type="button" onClick={openModal}>
                <img src="images/Frame2.png" alt=""></img>
              </button>
              {isOpen && (
                <div className={classes.modal}>
                  <div className={classes.modalContent}>
                    <div className={classes.name}>
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                    </div>
                    <div className={classes.modalButtons}>
                      <button
                        type="button"
                        onClick={() => navigate('/profile')}
                      >
                        <img src="" alt="" />
                        <span>Мой профиль</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => (window.location.href = '/logout')}
                      >
                        <img src="" alt="" />
                        <span>Выйти</span>
                      </button>
                      <button type="button" onClick={() => 1}>
                        <img src="" alt="" />
                        <span>Удалить</span>
                      </button>
                    </div>
                    <button
                      className={classes.close}
                      onClick={() => {
                        closeModal()
                        console.log(123)
                      }}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              )}

              <button>
                <img src="images/Frame4.png" alt=""></img>
              </button>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
      {/* начало третего контейнера  */}
      <div className={classes.greenLine}>
        <CenterBlock>
          <WidthBlock>
            <ul className={classes.navTwo}>
              <li>
                <a href="">Тепловое</a>
              </li>
              <li>
                <a href="">Холодильное</a>
              </li>
              <li>
                <a href="">Электромеханическое</a>
              </li>
              <li>
                <a href="">Посудомоечное</a>
              </li>
              <li>
                <a href="">Нейтральное</a>
              </li>
              <li>
                <a href="">Линии раздачи</a>
              </li>
              <li>
                <a href="">Аксессуары</a>
              </li>
            </ul>
          </WidthBlock>
        </CenterBlock>

        <div className={classes.headerContainer3}></div>
      </div>
    </>
  );
}

export default Header;