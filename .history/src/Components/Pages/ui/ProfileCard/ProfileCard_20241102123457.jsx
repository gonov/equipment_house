import React from 'react';
import classes from './ProfileCard.module.css';

function ProfileCard({ user }) {
  return <>
  <div className={classes.userName}>
    <span>ФИО</span>
    <span></span>
  </div>
  </>;
}

export default ProfileCard;
