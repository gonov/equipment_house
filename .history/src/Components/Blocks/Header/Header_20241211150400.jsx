import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
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
  const [cartItemCount, setCartItemCount] = useState(0);

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
    const updateCartCount = () => {
      const count = parseInt(localStorage.getItem('cartItemCount'), 10) || 0;
      setCartItemCount(count);
    };
  
    updateCartCount();
  
    // Обновляем данные при изменении localStorage
    const handleStorageChange = () => updateCartCount();
    window.addEventListener('storage', handleStorageChange);
  
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  

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
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [searchTimeout, setSearchTimeout] = useState(null); // Переменная для таймера поиска

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    setLoading(true); // Включаем индикатор загрузки

    if (searchTimeout) {
      clearTimeout(searchTimeout); // Очищаем старый таймер
    }

    if (query) {
      const timeout = setTimeout(async () => {
        try {
          const filter = { name: query };
          console.log('Request filter:', filter); // Логирование фильтра

          const response = await fetch(
            `${serverConfig}/products?filter=${encodeURIComponent(
              JSON.stringify(filter)
            )}`
          );
          const data = await response.json();
          setSearchResults(data);
          setIsDropdownVisible(data.length > 0);
        } catch (error) {
          console.error('Ошибка поиска:', error);
          setSearchResults([]);
          setIsDropdownVisible(false);
          setError('Ошибка при поиске');
        } finally {
          setLoading(false); // Отключаем индикатор загрузки
        }
      }, 500);
      setSearchTimeout(timeout); // Устанавливаем новый таймер
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
      setLoading(false);
    }
  };

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
              {/* <button className={classes.searchImg}>
                <img src="/images/Background.png" alt="Search" />
              </button> */}
              {isDropdownVisible && (
                <div className={classes.searchDropdown}>
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((item) => (
                        <li
                          className={classes.searchLi}
                          key={item.id}
                          onClick={() => {
                            navigate(`/product/${item.id}`); // Переход на страницу товара
                            setSearchQuery(''); // Очищаем инпут
                            setIsDropdownVisible(false); // Закрываем выпадающий список
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
              {userData ? (
                <>
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
                    <span>{userData.name.split(' ')[0]}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => navigate('/registration')}
                  >
                    <img src="images/Vector.png" alt="User" />
                    <span>Регистрация</span>
                  </button>
                  <button type="button" onClick={() => navigate('/login')}>
                    <img src="images/Vector.png" alt="User" />
                    <span>Войти</span>
                  </button>
                </>
              )}
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
              {categories.slice(0, 5).map((el) => (
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
