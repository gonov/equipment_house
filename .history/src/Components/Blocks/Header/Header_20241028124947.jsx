import React, {useState} from 'react';
import classes from './Header.module.css';

function Header({ children, ...props }) {
    const []
  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.location}>
          <img src="/images/location.png" alt=""></img>
          <span className={classes.cityName}>Черкесск</span> 
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
