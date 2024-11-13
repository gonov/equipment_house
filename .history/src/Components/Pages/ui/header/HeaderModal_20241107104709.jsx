import React from 'react';
import classes from './HeaderModal.module.css';
import { useNavigate } from 'react-router-dom';

function HeaderModal(user, closeModal) {
  const navigate = useNavigate()
  return (
    <>
      <div className={classes.name}>
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <div className={classes.modalButtons}>
        <button
          type="button"
          onClick={() => (window.location.href = '/')}
        >
          <img src="" alt="" />
          <span>Мой профиль</span>
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = '/logout')}
        >
          <img src="" alt="" />
          <span>Выйти</span>
        </button>
        <button type="button" onClick={() => 1}>
          <img src="" alt="" />
          <span>Удалить</span>
        </button>
      </div>
      <button
        className={classes.close}
        onClick={() => {
          closeModal;
          console.log(123);
        }}
      >
        CLOSE
      </button>
    </>
  );
}

export default HeaderModal;
