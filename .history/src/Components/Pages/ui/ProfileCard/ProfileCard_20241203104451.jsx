import React from 'react';
import classes from './ProfileCard.module.css';

function ProfileCard({ userDA }) {
  return (
    <>
      <div className={classes.userData}>
        <div className={classes.userName}>
          <span className={classes.leftSpan}>ФИО</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.name}</span>
        </div>
        {/* <div className={classes.userPhone}>
          <span className={classes.leftSpan}>Телефон</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.phone}</span>
        </div> */}
        <div className={classes.Email}>
          <span className={classes.leftSpan}>Email</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.email}</span>
        </div>
        <div className={classes.userCompany}>
          <span className={classes.leftSpan}>Компания</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.company}</span>
        </div>
        <div className={classes.userCity}>
          <span className={classes.leftSpan}>Город</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.city}</span>
        </div>
        <div className={classes.userAddress}>
          <span className={classes.leftSpan}>Адрес доставки</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.address}</span>
        </div>
        <div className={classes.userType}>
          <span className={classes.leftSpan}>Тип клиента</span>
          <span className={classes.dottedLine}></span>
          <span className={classes.rightSpan}>{userDA.type}</span>
        </div>
      </div>
      <button type="button" className={classes.button}>Изменить</button>
    </>
  );
}

export default ProfileCard;
