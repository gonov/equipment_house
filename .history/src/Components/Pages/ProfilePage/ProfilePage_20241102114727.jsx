import React from 'react';
import classes from './Empty.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';

function ProfilePage({ children, ...props }) {
  return <>
  <CenterBlock>
    Wid
  </CenterBlock>
  <div className={classes.ProfilePageContainer}>
    <div className={classes.ProfilePageContainerData}>

    </div>
  </div>
  </>;
}

export default ProfilePage;
