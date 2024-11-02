import React from 'react';
import classes from './ProfilePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function ProfilePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.ProfilePageContainer}>
            <div className={classes.ProfilePageContainerData}>
              
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default ProfilePage;
