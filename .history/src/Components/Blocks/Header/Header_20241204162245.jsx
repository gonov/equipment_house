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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      }
    }
  };

  useEffect(() => {
    updateUserData();

    const handleStorageChange = () => {
      updateUserData();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${serverConfig}/categories`);
        if (!response.ok) throw new Error('Ошибка при загрузке категорий');

        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error('Некорректный формат данных категорий');
        }
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
        setError('Ошибка загрузки категорий');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  let searchTimeout;

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    clearTimeout(searchTimeout);

    if (query) {
      searchTimeout = setTimeout(async () => {
        try {
          const response = await fetch(
            `${serverConfig}/products?filter=${JSON.stringify({ name: query })}`
          );
          if (!response.ok) throw new Error('Ошибка при поиске продуктов');
          const data = await response.json();
          setSearchResults(data);
          setIsDropdownVisible(data.length > 0);
        } catch (error) {
          console.error('Ошибка поиска:', error);
          setSearchResults([]);
          setIsDropdownVisible(false);
        }
      }, 500);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

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
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Поиск по товарам"
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
                          className={classes.searchLi}
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
        </WidthBlock>
      </CenterBlock>
      <div className={classes.greenLine}>
        <CenterBlock>
          <WidthBlock>
            <ul>
              {!loading &&
                categories.length > 0 &&
                categories.slice(0, 7).map((el) => (
                  <Link
                    to={`/category/${el.id}`}
                    className={classes.link}
                    key={el.id}
                  >
                    {el.title}
                  </Link>
                ))}
              {loading && <p>Загрузка категорий...</p>}
              {error && <p>{error}</p>}
            </ul>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Header;
