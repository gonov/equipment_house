import React, { useState } from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import BasketCard from '../ui/basketCard/BasketCard';
import { products, user } from '../Bd';
import ProductCard from '../ui/profilePage/ProductCard';
import serverConfig from '../../../../serverConfig';

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isChecked: false,
  });

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Загрузка товаров
        const usersResponse = await fetch(`${serverConfig}/users`);
        const userData = await usersResponse.json();
        console.log('Loaded categories:', userData); // Логируем полученные данные
        setCategories(userData);

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
      const response = await fetch('https://your-api-endpoint.com/submit', {
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
                  <ProfileCard user={user} />
                </div>
              </div>

              <div className={classes.delivery}>
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
              </div>
              <div className={classes.feedback}>
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
              </div>
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