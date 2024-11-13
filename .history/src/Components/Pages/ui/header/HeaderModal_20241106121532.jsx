import React from 'react';
import classes from './Empty.module.css';

function HeaderModal(user) {
  return (
    <>
      <div className={classes.name}>
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <div className={classes.modalButtons}>
        <button type='button' onClick={() => window.location.h}><img src='' alt=''/><span>Мой профиль</span></button>
      </div>
    </>
  );
}

export default HeaderModal;
