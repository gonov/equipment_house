import React from 'react';
import classes from './Empty.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function ProfilePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          
        </WidthBlock>
      <div className={classes.ProfilePageContainer}>
        <div className={classes.ProfilePageContainerData}></div>
      </div>
      </CenterBlock>
    </>
  );
}

export default ProfilePage;