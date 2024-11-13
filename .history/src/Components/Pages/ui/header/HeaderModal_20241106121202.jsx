import React from 'react';
import classes from './Empty.module.css';

function HeaderModal(user) {
  return (
    <>
      <div className={classes.name}>
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      
    </>
  );
}

export default HeaderModal;
