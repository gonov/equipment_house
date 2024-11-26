import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';

// Устанавливаем root для модального окна
Modal.setAppElement('#root');

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Данные пользователя
  const navigate = useNavigate();

  useEffect(() => {
    // Загружаем данные пользователя из localStorage при монтировании
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Удаляем токен и данные пользователя из localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);

    // Перенаправляем на страницу входа
    navigate('/login');
  };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.headerContainer1}>
            <div className={classes.location}>
              <img src="/images/location.png" alt="" />
              <span className={classes.cityName}>Черкесск</span>
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
              {user ? (
                <button type="button" onClick={openModal}>
                  <img src="/images/Vector.png" alt="" />
                  <span>{user.name}</span>
                </button>
              ) : (
                <button type="button" onClick={() => navigate('/login')}>
                  <img src="/images/Vector.png" alt="" />
                  <span>Войти</span>
                </button>
              )}

              {/* Модальное окно */}
              <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={classes.modal}
                overlayClassName={classes.overlay}
                shouldCloseOnOverlayClick={true}
              >
                <div className={classes.modalContent}>
                  {user ? (
                    <>
                      <div className={classes.name}>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                      </div>
                      <div className={classes.modalButtons}>
                        <button onClick={() => navigate('/profile')}>
                          <span>Мой профиль</span>
                        </button>
                        <button onClick={handleLogout}>
                          <span>Выйти</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={classes.name}>
                      <span>Пользователь не авторизован</span>
                    </div>
                  )}
                </div>
              </Modal>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Header;
