import React, { useEffect, useState } from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import ProductCard from '../ui/profilePage/ProductCard';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import serverConfig from '../../../../serverConfig';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const token = Cookies.get('authToken') || localStorage.getItem('authToken');

        if (!token) {
          setUserData(null); // Если токен удален
          return;
        }

        const decodedToken = jwtDecode(token);
        setUserData({
          userId: decodedToken.userId,
          name: decodedToken.name,
          email: decodedToken.email,
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersResponse = await fetch(`${serverConfig}/orders`);
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getOrdersByUser = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.profilePageContainer}>
          <div className={classes.profilePageContainerLeft}>
            <span className={classes.profilePageContainerDataUserData}>Данные профиля</span>
            <div className={classes.profilePageContainerData}>
              <div className={classes.profilePageContainerDataUser}>
                {userData ? (
                  <ProfileCard user={userData} />
                ) : (
                  <p>Вы не авторизованы. <Link to="/login">Войти</Link></p>
                )}
              </div>
            </div>
          </div>

          <div className={classes.profilePageContainerHistory}>
            <span>История заказов</span>
            {userData && getOrdersByUser(userData.userId).map((el) => (
              <div className={classes.profileCard} key={el.id}>
                <ProductCard el={el} />
              </div>
            ))}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default ProfilePage;
