import React, { useState } from 'react';
import classes from './Header.module.css';

function Header({ children, ...props }) {
  const [selectedCity, setSelectedCity] = useState('Черкесск');

  const handleSelectCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const cities = [
    { value: 'Черкесск', label: 'Черкесск' },
    { value: 'Москва', label: 'Москва' },
    { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
  ];

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.location}>
          <img src="/images/location.png" alt=""></img>
          <span className={classes.cityName}>{selectedCity}</span>
          <img src="/images/Ellipse1.png" alt="" className={classes}></img>
          <div className={classes.select}>
            {/* <select
              onChange={handleSelectCityChange}
              value={selectedCity}
              className={classes.citySelect}
            >
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  Указать город
                </option>
              ))}
            </select> */}
            <span>Указать город</span>
          </div>
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
        <div className={classes.call}>
          <img src="/images/coolicon.png" alt=""></img>
          <span className={classes.phone}>8-928-380-41-46</span>
        </div>
      </div>
    </>
  );
}

export default Header;
