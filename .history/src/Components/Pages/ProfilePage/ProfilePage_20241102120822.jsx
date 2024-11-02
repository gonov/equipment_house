import React, { useState } from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import BasketCard from '../ui/basketCard/BasketCard';
import { products, user } from '../Bd';

function ProfilePage({ children, ...props }) {

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   message: '',
  //   isChecked: false,
  // });

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
          <div className={classes.ProfilePageContainer}>
            <div className={classes.ProfilePageContainerData}>
              <ProfileCard  />
            </div>
            <div className={classes.ProfilePageContainerHistory}>
              {/* <BasketCard /> */}
            </div>
          </div>
          <div className={classes.delivery}>
            <span>Доставка</span>
            <input type="text" name="city"></input>
            <input type="text" name="street"></input>
            <button>Изменить</button>
          </div>
          <div className={classes.payment}>
            <span>{user.payment}</span>
          </div>
          <div className={classes.feedback}>
            <span>Обратная связь</span>
            <span>
              Если у Вас оставлись вопросы, вы можете оставить заявку и с Вами
              свяжется наш менеджер
            </span>
            <div className={classes.feedbackForm}>
              <input type="tetxt" name="name" placeholder="ФИО*" />
              <input type="number" name="phone" placeholder="Телефон*" />
              <input type="email" name="email" placeholder="E-mail*" />
              <input type="tetxt" name="comment" placeholder="Комментарий*" />
            </div>
            {/* <div className={classes.feedbackFormSend}>
                <label className={classes.custom_checkbox}>
                  <input
                    type="checkbox"
                    name="isChecked"
                    checked={formData.isChecked}
                    onChange={handleChange}
                  />
                  <span className={classes.checkmark}></span>
                </label>
                <span>
                  Отправляя форму, я даю согласие на обработку персональных{' '}
                  <br />
                  данных, подтверждаю согласие с политикой конфиденциальности
                </span>
                <button type="submit">Отправить</button>
              </div> */}
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ProfilePage;
