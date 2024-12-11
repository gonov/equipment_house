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
  const [cartItemCount, setCartItemCount] = useState(0); // Состояние для количества товаров в корзине
  const [searchQuery, setSearchQuery] = useState('');
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
        console.error('Ошибка декодирования токена:', error.message);
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

  // Получение количества товаров в корзине
  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        if (!token) return;

        const response = await fetch(`${serverConfig}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const totalItems = data.basketItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartItemCount(totalItems);
      } catch (error) {
        console.error('Ошибка при загрузке данных корзины:', error.message);
        setCartItemCount(0);
      }
    };

    fetchCartItemCount();
  }, [token]);

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
            {/* Остальной код шапки */}
          </div>
          <div className={classes.headerContainer2}>
            {/* Логотип и поиск */}
            <div className={classes.search}>
              {/* Поле для поиска */}
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
                    <span>Корзина ({cartItemCount})</span> {/* Счетчик */}
                  </button>
                  <button type="button" onClick={openModal}>
                    <img src="images/Vector.png" alt="Пользователь" />
                    <span>{userData.name.split(' ')[0]}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => navigate('/registration')}
                  >
                    <img src="images/Vector.png" alt="Пользователь" />
                    <span>Регистрация</span>
                  </button>
                  <button type="button" onClick={() => navigate('/login')}>
                    <img src="images/Vector.png" alt="Пользователь" />
                    <span>Войти</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
      {/* Модальное окно */}
    </>
  );
}

export default Header;
