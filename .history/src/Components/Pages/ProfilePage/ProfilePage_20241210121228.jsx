import React, { useEffect, useState } from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import BasketCard from '../ui/basketCard/BasketCard';
// import { products } from '../Bd';
import ProductCard from '../ui/profilePage/ProductCard';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import serverConfig from '../../../../serverConfig';

function ProfilePage() {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   message: '',
  //   isChecked: false,
  // });

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const token =
          Cookies.get('authToken') || localStorage.getItem('authToken');

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

    // Подписка на событие storage
    window.addEventListener('storage', handleStorageChange);

    // Чтение токена при загрузке компонента
    handleStorageChange();

    // Очистка слушателя при размонтировании
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка категорий
        const ordersResponse = await fetch(`${serverConfig}/orders`);
        const ordersData = await ordersResponse.json();
        console.log('Loaded categories:', ordersData); // Логируем полученные данные
        setOrders(ordersData);

        //Загрузка товаров
        // const productsResponse = await fetch(`${serverConfig}/products`);
        // const productsData = await productsResponse.json();
        // console.log('Loaded products:', productsData); // Логируем полученные данные
        // setProducts(productsData);

        // Загрузка других данных, если необходимо
        // const busSolutionsResponse = await fetch('https://your-api-endpoint.com/solutions');
        // const busSolutionsData = await busSolutionsResponse.json();
        // setBusSolutions(busSolutionsData);

        // const newsResponse = await fetch(`${serverConfig}/news`);
        // const newsData = await newsResponse.json();
        // setNews(newsData);
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
    return orders.filter((order) => product.categoryId === categoryId);
  };


  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!formData.isChecked) {
  //     alert(
  //       'Пожалуйста, подтвердите согласие на обработку персональных данных.'
  //     );
  //     return;
  //   }

  //   try {
  //     const response = await fetch('https://your-api-endpoint.com/submit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert('Форма успешно отправлена!');
  //     } else {
  //       alert('Произошла ошибка при отправке формы.');
  //     }
  //   } catch (error) {
  //     console.error('Ошибка:', error);
  //     alert('Произошла ошибка при отправке формы.');
  //   }
  // };

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.profilePageContainer}>
            <div className={classes.profilePageContainerLeft}>
              <span className={classes.profilePageContainerDataUserData}>
                Данные профиля
              </span>
              <div className={classes.profilePageContainerData}>
                <div className={classes.profilePageContainerDataUser}>
                  {userData ? (
                    <>
                      <ProfileCard user={userData} />
                    </>
                  ) : (
                    <p>
                      Вы не авторизованы. <Link to="/login">Войти</Link>
                    </p>
                  )}
                </div>
              </div>

              {/* <div className={classes.delivery}>
                <span>Доставка</span>
                <input type="text" name="city" placeholder="Город"></input>
                <input
                  type="text"
                  name="street"
                  placeholder="Улица, дом"
                ></input>
                <button>Изменить</button>
              </div>
              <div className={classes.payment}>
                <span>Способ оплаты</span>
                <span>{user.payment}</span>
              </div> */}
              {/* <div className={classes.feedback}>
                <div className={classes.feedbackName}>
                  <span>Обратная связь</span>
                  <span>
                    Если у Вас оставлись вопросы, вы можете оставить заявку и с
                    Вами свяжется наш менеджер
                  </span>
                </div>
                <div className={classes.feedbackForm}>
                  <div className={classes.feedbackFormInput}>
                    <input type="text" name="name" placeholder="ФИО*" />
                    <input type="number" name="phone" placeholder="Телефон*" />
                    <input type="email" name="email" placeholder="E-mail*" />
                    <input
                      type="tetxt"
                      name="comment"
                      placeholder="Комментарий*"
                    />
                  </div>
                  <div className={classes.feedbackFormSend}>
                    <label className={classes.custom_checkbox}>
                      <input
                        type="checkbox"
                        name="isChecked"
                        checked={formData.isChecked}
                        onChange={handleChange}
                      />
                      <span className={classes.checkmark}></span>
                    </label>
                    <span className={classes.sendText}>
                      Отправляя форму, я даю согласие на обработку персональных
                      данных, подтверждаю согласие с политикой
                      конфиденциальности
                    </span>
                  </div>
                  <button type="submit">Отправить</button>
                </div>
              </div> */}
            </div>
            <div className={classes.profilePageContainerHistory}>
              <span>История заказов</span>
              {products.map((el) => (
                <div className={classes.profileCard} key={el.id}>
                  <ProductCard el={el} key={el.id} />
                </div>
              ))}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ProfilePage;
