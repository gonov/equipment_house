import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import classes from './Header.module.css';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';

// Инициализация модального окна для привязки к элементу root
Modal.setAppElement('#root');

function Header() {
  const [selectedCity, setSelectedCity] = useState('Черкесск');
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]); // Данные для поиска
  const navigate = useNavigate();

  useEffect(() => {
    // Имитируем загрузку данных при старте приложения
    const initialProducts = [
      { id: 1, name: 'Тепловое оборудование' },
      { id: 2, name: 'Холодильное оборудование' },
      { id: 3, name: 'Электромеханическое оборудование' },
      { id: 4, name: 'Посудомоечное оборудование' },
      { id: 5, name: 'Нейтральное оборудование' },
      { id: 6, name: 'Линии раздачи' },
      { id: 7, name: 'Аксессуары' },
    ];
    setProducts(initialProducts);

    const handleStorageChange = () => {
      try {
        const token = Cookies.get('authToken') || localStorage.getItem('authToken');
        if (!token) {
          setUserData(null);
          return;
        }

        const decodedToken = jwtDecode(token);
        setUserData({
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        });
      } catch (error) {
        console.error('Error decoding token:', error.message);
        setUserData(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Фильтруем продукты по строке поиска
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredProducts);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('authToken');
    setUserData(null);
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
              <img src="/images/location.png" alt="Location" />
              <span className={classes.cityName}>{selectedCity}</span>
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
              <input
                placeholder="Поиск по названию товара или категории"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className={classes.searchImg}>
                <img src="/images/Background.png" alt="Search" />
              </button>
              {searchResults.length > 0 && (
                <ul className={classes.searchResults}>
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
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
                <span>{userData ? userData.name : 'Войти'}</span>
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
                <span>Роль: {userData.role}</span>
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
      </div>
    </>
  );
}

export default Header;