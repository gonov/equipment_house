import React from 'react';
import classes from './Empty.module.css';

function ProfilePage({ children, ...props }) {
  return <>
  <div className={classes.ProfilePageContainer}>
    <div className={classes.ProfilePageContainer}></div>
  </div>
  </>;
}

export default ProfilePage;