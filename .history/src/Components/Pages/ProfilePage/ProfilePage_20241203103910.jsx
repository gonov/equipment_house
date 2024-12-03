import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с cookies
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import ProductCard from '../ui/profilePage/ProductCard';
import serverConfig from '../../../../serverConfig';

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isChecked: false,
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Извлечение данных из cookies
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userCookie = Cookies.get('user'); // Получаем данные пользователя из cookies
        if (userCookie) {
          const parsedUser = JSON.parse(userCookie); // Преобразуем строку в объект
          setUser(parsedUser);
        } else {
          console.warn('Пользователь не найден в cookies');
        }
      } catch (err) {
        console.error('Ошибка загрузки данных пользователя из cookies:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.isChecked) {
      alert(
        'Пожалуйста, подтвердите согласие на обработку персональных данных.'
      );
      return;
    }

    try {
      const response = await fetch(`${serverConfig}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Форма успешно отправлена!');
      } else {
        alert('Произошла ошибка при отправке формы.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке формы.');
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                  {user ? (
                    <ProfileCard user={user} />
                  ) : (
                    <div>Пользователь не найден</div>
                  )}
                </div>
              </div>
              <div className={classes.delivery}>
                <span>Доставка</span>
                <input type="text" name="city" placeholder="Город" />
                <input
                  type="text"
                  name="street"
                  placeholder="Улица, дом"
                />
                <button>Изменить</button>
              </div>
              <div className={classes.payment}>
                <span>Способ оплаты</span>
              </div>
              <div className={classes.feedback}>
                <div className={classes.feedbackName}>
                  <span>Обратная связь</span>
                  <span>
                    Если у Вас оставлись вопросы, вы можете оставить заявку и с
                    Вами свяжется наш менеджер
                  </span>
                </div>
                <form className={classes.feedbackForm} onSubmit={handleSubmit}>
                  <div className={classes.feedbackFormInput}>
                    <input
                      type="text"
                      name="name"
                      placeholder="ФИО*"
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      name="phone"
                      placeholder="Телефон*"
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail*"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="comment"
                      placeholder="Комментарий*"
                      onChange={handleChange}
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
                </form>
              </div>
            </div>
            <div className={classes.profilePageContainerHistory}>
              <span>История заказов</span>
              {/* Пример статической истории */}
              {products.map((el) => (
                <div className={classes.profileCard} key={el.id}>
                  <ProductCard el={el} />
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
