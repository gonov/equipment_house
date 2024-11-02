import React from 'react';
import classes from './ProfileCard.module.css';

function ProfileCard({ user }) {
  return <>
  <div className={classes.userName}>
    <span>ФИО</span>
    <span>{user.name}</span>
  </div>
  <div className={classes.userPhone}>
    <span>Телефон</span>
    <span>{user.phone}</span>
  </div>
  <div className={classes.Email}>
    <span>Email</span>
    <span>{user.email}</span>
  </div>
  
  </>;
}

export default ProfileCard;
