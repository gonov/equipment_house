import React from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import ProfileCard from '../ui/ProfileCard/ProfileCard';
import BasketCard from '../ui/basketCard/BasketCard';

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
            <
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ProfilePage;
