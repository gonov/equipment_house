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
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Состояние для количества товаров в корзине
  const [loading, setLoading] = useState(false);
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
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Функция для получения количества товаров в корзине
  const fetchCartCount = async () => {
    try {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`${serverConfig}/cart/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCartCount(data.count || 0); // Устанавливаем количество товаров в корзине
    } catch (error) {
      console.error('Ошибка получения количества товаров в корзине:', error);
    }
  };

  useEffect(() => {
    // Запрашиваем количество товаров в корзине, если пользователь авторизован
    if (userData) {
      fetchCartCount();
    }
  }, [userData]); // Обновление количества при изменении данных пользователя

  const handleLogout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('authToken');
    setUserData(null);
    setCartCount(0); // Сбрасываем количество товаров в корзине
    navigate('/login');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  // Функция для добавления товара в корзину
  const handleAddToCart = async (productId, quantity) => {
    try {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');
      if (!token) return;

      // Пример запроса на добавление товара в корзину
      const response = await fetch(`${serverConfig}/cart/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        // После добавления товара в корзину, обновляем количество товаров
        fetchCartCount();
      } else {
        console.error('Ошибка при добавлении товара в корзину');
      }
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
    }
  };

  // Функция для удаления товара из корзины
  const handleRemoveFromCart = async (productId) => {
    try {
      const token = Cookies.get('authToken') || localStorage.getItem('authToken');
      if (!token) return;

      // Пример запроса на удаление товара из корзины
      const response = await fetch(`${serverConfig}/cart/remove`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        // После удаления товара из корзины, обновляем количество товаров
        fetchCartCount();
      } else {
        console.error('Ошибка при удалении товара из корзины');
      }
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по товарам"
              />
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
                    {cartCount > 0 && <span className={classes.cartCount}>{cartCount}</span>}
                  </button>
                  <button type="button" onClick={openModal}>
                    <img src="images/Vector.png" alt="User" />
                    <span>{userData.name.split(' ')[0]}</span>
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => navigate('/registration')}>
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
        onRequestClose={() => setIsOpen(false)}
        className={classes.modal}
        overlayClassName={classes.overlay}
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
