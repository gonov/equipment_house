import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';

// Инициализация модального окна для привязки к элементу root
Modal.setAppElement('#root');

function Header({ children, ...props }) {
  const [selectedCity, setSelectedCity] = useState('Черкесск');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.warn('No token found');
        return;
      }

      const decodedToken = jwtDecode(token); // Декодируем токен
      console.log('Decoded token:', decodedToken);

      setUserData({
        userId: decodedToken.userId,
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    } catch (error) {
      console.error('Failed to load user data:', error);
      setUserData(null); // Сбросить данные, если токен некорректный
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Обработчик логаута
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserData(null); // Сбросить данные пользователя
    navigate('/login'); // Перенаправление на страницу входа
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
              <img src="/images/location.png" alt="Location" />
              <span className={classes.cityName}>{selectedCity}</span>
              <div className={classes.select}>
                <div className={classes.city}>Указать город:</div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={classes.cityDropdown}
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
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
              <img src="/images/coolicon.png" alt="Call" />
              <h4 className={classes.phone}>8-928-380-41-46</h4>
            </div>
          </div>
          <div className={classes.headerContainer2}>
            <div className={classes.houseName}>
              <img
                src="/images/home.png"
                alt="Home"
                onClick={() => navigate('/')}
              />
            </div>
            <div className={classes.search}>
              <input placeholder="Поиск по названию товара или категории" />
              <button className={classes.searchImg}>
                <img src="/images/Background.png" alt="Search" />
              </button>
            </div>
            <div className={classes.buttons}>
              <button>
                <img
                  src="/images/cartHeader.png"
                  alt="Cart"
                  onClick={() => navigate('/basket')}
                />
                <span>Корзина</span>
              </button>
              {userData ? (
                <button type="button" onClick={openModal}>
                  <img src="/images/Vector.png" alt="User" />
                  <span>{userData.name}</span>
                </button>
              ) : (
                <button type="button" onClick={() => navigate('/login')}>
                  <img src="/images/Vector.png" alt="Login" />
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
                  {userData ? (
                    <>
                      <div className={classes.name}>
                        <span>{userData.name}</span>
                        <span>{userData.email}</span>
                      </div>
                      <div className={classes.modalButtons}>
                        <button
                          type="button"
                          onClick={() => navigate('/profile')}
                        >
                          <img src="/images/Vector.png" alt="Profile" />
                          <span>Мой профиль</span>
                        </button>
                        <button type="button" onClick={handleLogout}>
                          <img src="/images/exit.png" alt="Logout" />
                          <span>Выйти</span>
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
    </>
  );
}

export default Header;
