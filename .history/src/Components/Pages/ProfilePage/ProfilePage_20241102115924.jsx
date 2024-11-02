import React from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import BasketCard from '../ui/basketCard/BasketCard';
import { user } from '../Bd';

function ProfilePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.ProfilePageContainer}>
            <div className={classes.ProfilePageContainerData}>
              <ProfileCard />
            </div>
            <div className={classes.ProfilePageContainerHistory}>
              <BasketCard />
            </div>
          </div>
          <div className={classes.delivery}>
            <span>Доставка</span>
            <input type='text' name='city'></input>
            <input type='text' name='street'></input>
            <button>Изменить</button>
          </div>
          <div className={classes.payment}>
            <span>{user.payment}</span>
          </div>
          <div className={classes.feedback}>
            <span>Обратная связь</span>
            <span>Если у Вас оставлись вопросы, вы можете оставить заявку и с Вами свяжется наш менеджер</span>
        <div className={classes.feedbackForm}>
          <input type='' name=''
        </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ProfilePage;
