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

  // Handle user data and authentication token
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const token = Cookies.get('authToken') || localStorage.getItem('authToken');

        if (!token) {
          setUserData(null); // If token is removed
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

  // Fetch orders from the server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersResponse = await fetch(`${serverConfig}/orders`);
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get orders specific to the logged-in user
  const getOrdersByUser = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.profilePageContainer}>
          {/* Profile Section */}
          <div className={classes.profilePageContainerLeft}>
            <span className={classes.profilePageContainerDataUserData}>Profile Information</span>
            <div className={classes.profilePageContainerData}>
              <div className={classes.profilePageContainerDataUser}>
                {userData ? (
                  <ProfileCard user={userData} />
                ) : (
                  <p>
                    You are not logged in. <Link to="/login">Login</Link>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className={classes.profilePageContainerHistory}>
            <span>Order History</span>
            {userData && getOrdersByUser(userData.userId).length > 0 ? (
              getOrdersByUser(userData.userId).map((order) => (
                <div className={classes.orderCard} key={order.id}>
                  <div className={classes.orderDetails}>
                    <h3>Order ID: {order.id}</h3>
                    <p><strong>Total: </strong>{order.total} ₽</p>
                    <p><strong>Address: </strong>{order.adress}</p>
                    <p><strong>Payment Method: </strong>{order.paymentMethod}</p>
                    <p><strong>Status: </strong>{order.status}</p>
                  </div>
                  <div className={classes.orderItems}>
                    <h4>Items:</h4>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.id}>
                          <strong>{item.product.name}</strong> - {item.quantity} x {item.price} ₽
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={classes.orderActions}>
                    <Link to={`/orders/${order.id}`} className={classes.viewOrderBtn}>
                      View Order
                    </Link>
                    <button
                      className={classes.deleteOrderBtn}
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default ProfilePage;
