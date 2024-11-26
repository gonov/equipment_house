import React, { useState, useEffect } from 'react';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import Modal from 'react-modal';
import { user } from '../../Pages/Bd';
import { Link, useNavigate } from 'react-router-dom';

// Инициализация модального окна для привязки к элементу root
Modal.setAppElement('#root');

function Header({ children, ...props }) {
  const [selectedCity, setSelectedCity] = useState('Черкесск');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Извлечение данных пользователя из localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  console.log(user);
  

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Обработчик логаута
  const handleLogout = () => {
    // Удаление токена
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Перенаправление на страницу входа
    navigate('/login');
  };

  const cities = [
    { value: 'Черкесск', label: 'Черкесск' },
    { value: 'Москва', label: 'Москва' },
    { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  ];

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.headerContainer1}>
            <div className={classes.location}>
              <img src="/images/location.png" alt="" />
              <span className={classes.cityName}>{selectedCity}</span>
              <img src="/images/Ellipse1.png" alt="" />
              <div className={classes.select}>
                <div className={classes.city}>Указать город</div>
              </div>
            </div>
            <ul className={classes.navone}>
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/news">Новости</Link>
              </li>
              <li>
                <Link to="/solutions">Готовые решения для бизнеса</Link>
              </li>
              <li>
                <Link to="/company">О компании</Link>
              </li>
            </ul>
            <div className={classes.call}>
              <img src="/images/coolicon.png" alt="" />
              <h4 className={classes.phone}>8-928-380-41-46</h4>
            </div>
          </div>
          <div className={classes.headerContainer2}>
            <div className={classes.houseName}>
              <img
                src="/images/home.png"
                alt=""
                onClick={() => navigate('/')}
              />
            </div>
            <div className={classes.search}>
              <input placeholder="Поиск по названию товара или категории" />
              <button className={classes.searchImg}>
                <img src="/images/Background.png" alt="" />
              </button>
            </div>
            <div className={classes.buttons}>
              <button>
                <img
                  src="/images/cartHeader.png"
                  alt=""
                  onClick={() => navigate('/basket')}
                />
                <span>Корзина</span>
              </button>
              <button type="button" onClick={openModal}>
                <img src="images/Vector.png" alt="" />
                <span>Войти</span>
              </button>
              <button>
                <img src="images/signIn.png" alt="" />
                <span>Корзина</span>
              </button>

               {/* Модальное окно */}
               <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={classes.modal}
                overlayClassName={classes.overlay}
                shouldCloseOnOverlayClick={true}
              >
                <div className={classes.modalContent}>
                  {userData ? (
                    <>
                      <div className={classes.name}>
                        <span>{userData.name}</span>
                        <span>{userData.email}</span>
                      </div>
                      <div className={classes.modalButtons}>
                        <button type="button" onClick={() => navigate('/profile')}>
                          <img src="/images/Vector.png" alt="" />
                          <span>Мой профиль</span>
                        </button>
                        <button type="button" onClick={handleLogout}>
                          <img src="/images/exit.png" alt="" />
                          <span>Выйти</span>
                        </button>
                        <button type="button" onClick={() => { /* Удаление аккаунта */ }}>
                          <img src="/images/trash.png" alt="" />
                          <span>Удалить аккаунт</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>Пользователь не найден</p>
                  )}
                </div>
              </Modal>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
      <div className={classes.greenLine}>
        <CenterBlock>
          <WidthBlock>
            <ul className={classes.navTwo}>
              <li>
                <Link to="/category/1">Тепловое</Link>
              </li>
              <li>
                <Link to="/category/2">Холодильное</Link>
              </li>
              <li>
                <Link to="/category/3">Электромеханическое</Link>
              </li>
              <li>
                <Link to="/category/4">Посудомоечное</Link>
              </li>
              <li>
                <Link to="/category/5">Нейтральное</Link>
              </li>
              <li>
                <Link to="/category/6">Линии раздачи</Link>
              </li>
              <li>
                <Link to="/category/7">Аксессуары</Link>
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
