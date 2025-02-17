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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = Cookies.get('authToken') || localStorage.getItem('authToken');

  useEffect(() => {
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

  const handleCategoryClick = (categoryId) => {
    window.location.href = `/category/${categoryId}`; // Полная перезагрузка страницы
  };

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
              <h4 className={classes.phone}>
                <a href="tel:+79283804146">8-928-380-41-46</a>
              </h4>
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
                  <button type="button" onClick={() => setIsOpen(true)}>
                    <img src="/images/Vector.png" alt="User" />
                    <span>{userData.name.split(' ')[0]}</span>
                  </button>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
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
                        <p>
                          Вы не авторизованы. <Link to="/login">Войти</Link>
                        </p>
                      )}
                    </div>
                  </Modal>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => navigate('/registration')}
                  >
                    <img src="/images/Vector.png" alt="User" />
                    <span>Регистрация</span>
                  </button>
                  <button type="button" onClick={() => navigate('/login')}>
                    <img src="/images/Vector.png" alt="User" />
                    <span>Войти</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>

      <div className={classes.greenLine}>
        <CenterBlock>
          <WidthBlock>
            <ul>
              {categories?.slice(0, 5).map((el) => (
                <li
                  key={el.id}
                  className={classes.link}
                  onClick={() => handleCategoryClick(el.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {el.title}
                </li>
              ))}
            </ul>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Header;
