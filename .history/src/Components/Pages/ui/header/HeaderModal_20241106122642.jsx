import React from 'react';
import classes from './HeaderModal.module.css';

function HeaderModal(user) {
  return (
    <>
      <div className={classes.name}>
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <div className={classes.modalButtons}>
        <button
          type="button"
          onClick={() => (window.location.href = '/profile')}
        >
          {/* <img src="" alt="" /> */}
          <span>Мой профиль</span>
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = '/logout')}
        >
          {/* <img src="" alt="" /> */}
          <span>Выйти</span>
        </button>
        <button
          type="button"
          onClick={() => ()}
        >
          {/* <img src="" alt="" /> */}
          <span>Удалить</span>
        </button>
      </div>
    </>
  );
}

export default HeaderModal;
