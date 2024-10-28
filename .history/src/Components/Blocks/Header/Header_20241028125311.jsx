import React, { useState } from 'react';
import classes from './Header.module.css';

function Header({ children, ...props }) {
  const [selectedCity, setSelectedCity] = useState('Черкесск');

  const handleSelectCityChange = (event) => {
    setSelectedCity(event.target.value);
  };



  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.location}>
          <img src="/images/location.png" alt=""></img>
          <span className={classes.cityName}>{selectedCity}</span>
        </div>
        <div className=''
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
