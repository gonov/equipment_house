import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = Cookies.get('authToken') || localStorage.getItem('authToken');

  // Загрузка всех товаров при монтировании
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${serverConfig}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    };

    fetchProducts();
  }, []);

  // Обработчик поиска с задержкой
  let searchTimeout;
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      if (query) {
        const filteredResults = products.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
        setSearchResults(filteredResults);
        setIsDropdownVisible(true);
      } else {
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    }, 800); // Задержка 800 мс
  };

  // Закрытие выпадающего списка при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${classes.searchDropdown}`)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Обновление данных пользователя из токена
  useEffect(() => {
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
        }
      }
    };

    updateUserData();

    const handleStorageChange = () => {
      updateUserData();
    };

    // Подписка на изменения в localStorage и cookies
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('authToken');
    setUserData(null);
    navigate('/login');
  };

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
                <option value="Черкесск">Черкесск</option>
              </select>
            </div>
            <div className={classes.headerContainer2}>
              <div className={classes.search}>
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Поиск по названию товара"
                  onFocus={() => searchQuery && setIsDropdownVisible(true)}
                />
                <button className={classes.searchImg}>
                  <img src="/images/Background.png" alt="Search" />
                </button>
                {isDropdownVisible && (
                  <div className={classes.searchDropdown}>
                    {searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => {
                              navigate(`/product/${item.id}`);
                              setIsDropdownVisible(false);
                            }}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Ничего не найдено</p>
                    )}
                  </div>
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
                  <span>{userData ? userData.name.split(' ')[0] : 'Войти'}</span>
                </button>
              </div>
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
    </>
  );
}

export default Header;
