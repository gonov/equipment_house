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
  <div className={classes.userCompany}>
    <span>Компания</span>
    <span>{user.company}</span>
  </div>
  <div className={classes.userCity}>
    <span>Город</span>
    <span>{user.city}</span>
  </div>
  <div className={classes.userAddress}>
    <span>Адрес доставки</span>
    <span>{user.address}</span>
  </div>
  <div className={classes.userType}>
    <span>ФИО</span>
    <span>{user.name}</span>
  </div>
  </>;
}

export default ProfileCard;
