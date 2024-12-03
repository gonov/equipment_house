import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Исправлено: jwtDecode импортируется без фигурных скобок
import Cookies from 'js-cookie';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import serverConfig from '../../../../serverConfig';

Modal.setAppElement('#root');

function Header() {
  const [selectedCity, setSelectedCity] = useState('Черкесск');
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get('authToken') || localStorage.getItem('authToken');
  // Обновление данных пользователя из токена
  const updateUserData = () => {

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserData({
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } catch (error) {
        console.error('Error decoding token:', error.message);
        // setUserData(null);
      }
    } else {
      // setUserData(null);
    }
  };

  useEffect(() => {
    updateUserData(); // Проверка токена при загрузке компонента

    const handleStorageChange = () => {
      updateUserData();
    };

    // Подписка на изменения в localStorage и cookies
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetch(`${serverConfig}/categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('authToken');
    setUserData(null);
    navigate('/login');
  };

  const cities = [{ value: 'Черкесск', label: 'Черкесск' }];

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.headerContainer1}>
            <div className={classes.location}>
              <img src="/images/location.png" alt="Location" />
              <span className={classes.cityName}>{selectedCity}</span>
              <span className={classes.blackBall}>.</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={classes.citySelect}
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
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
                  alt="Корзина"
                  onClick={() => navigate('/basket')}
                />
                <span>Корзина</span>
              </button>
              <button type="button" onClick={openModal}>
                <img src="images/Vector.png" alt="User" />
                <span>{userData ? userData.name.split(' ')[0] : 'Войти'}</span>
              </button>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
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
                <span>Имя: {userData.name}</span>
                <span>Email: {userData.email}</span>
              </div>
              <div className={classes.modalButtons}>
                <button type="button" onClick={() => navigate('/profile')}>
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
            <p>
              Вы не авторизованы. <Link to="/login">Войти</Link>
            </p>
          )}
        </div>
      </Modal>
      <div className={classes.greenLine}>
        <CenterBlock>
          <WidthBlock>
            <ul>
              {categories.splicemap((el) => (
                <Link
                  to={`/category/${el.id}`}
                  className={classes.link}
                  key={el.id}
                >
                  {el.title}
                </Link>
              ))}
            </ul>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Header;
