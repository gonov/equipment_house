import React from 'react';
import classes from './ProfileCard.module.css';

function ProfileCard({ user }) {
  return (
    <>
    <div className={classes.userData}>
      <div className={classes.userName}>
        <span className={classes.leftSpan}>ФИО</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.name}</span>
      </div>
      <div className={classes.userPhone}>
        <span className={classes.leftSpan}>Телефон</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.phone}</span>
      </div>
      <div className={classes.Email}>
        <span className={classes.leftSpan}>Email</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.email}</span>
      </div>
      <div className={classes.userCompany}>
        <span className={classes.leftSpan}>Компания</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.company}</span>
      </div>
      <div className={classes.userCity}>
        <span className={classes.leftSpan}>Город</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.city}</span>
      </div>
      <div className={classes.userAddress}>
        <span className={classes.leftSpan}>Адрес доставки</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.address}</span>
      </div>
      <div className={classes.userType}>
        <span className={classes.leftSpan}>Тип клиента</span>
        <div className={classes.dottedLine}></в>
        <span className={classes.rightSpan}>{user.type}</span>
      </div>
      </div>
    </>
  );
}

export default ProfileCard;
