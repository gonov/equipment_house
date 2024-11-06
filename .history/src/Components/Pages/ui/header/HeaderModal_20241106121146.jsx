import React from 'react';
import classes from './Empty.module.css';

function HeaderModal(user) {
  return <>
  <div className={classes.name}>
    <span>{user.name}</span>

  </div>
  </>;
}

export default HeaderModal;
