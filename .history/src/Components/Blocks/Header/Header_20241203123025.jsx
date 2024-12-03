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
  const [products, setProducts] = useState([]); // Все товары

  const navigate = useNavigate();
  const token = Cookies.get('authToken') || localStorage.getItem('authToken');

  // Загрузка всех товаров
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      if (query) {
        const filteredResults = products.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
        setSearchResults(filteredResults); // Показываем только результаты
        setIsDropdownVisible(true);
      } else {
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    }, 800); // Задержка в 800 мс
  };

  let searchTimeout; // Таймер для задержки

  // Обновление данных пользователя
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
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Header;
