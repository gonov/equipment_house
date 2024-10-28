import React from 'react';
import classes from './Header.module.css';

function Header({ children, ...props }) {
  return (
    <>
      <div className={classes.}>
        <div className={classes.city}>
            <img src='/images/location.png' alt=''></img>
        </div>
        <ul className={classes.navone}>
          <li>
            <a href="/catalog"> Каталог </a>
          </li>
          <li>
            <a href="/news"> Новости </a>
          </li>
          <li>
            <a href="/solution"> Готовые решения для бизнеса </a>
          </li>
          <li>
            <a href="/company"> О компании </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
