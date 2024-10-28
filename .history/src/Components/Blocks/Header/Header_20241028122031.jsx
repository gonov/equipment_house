import React from 'react';
import classes from './Header.module.css';

function Header({ children, ...props }) {
  return (
    <>
      <div>
        <ul className={classes.navone}>
          <li className='c'>
            <a>
              <img
                src="/images/location.png"
                alt="location"
              ></img>
              <div className='classes.text'>123</div>
            </a>
          </li>
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
