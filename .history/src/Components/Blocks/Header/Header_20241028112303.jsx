import React from "react";
import classes from './Header.module.css';

function Header({ children, ...props }) {
    return ( 
        <>
          <div className="nav_one">
            <ul>
                <li>
                    <a href="/catalog"> Каталог </a>
                </li>
                <li>
                    <a href="/news"> Новости </a>
                </li>
                <li>
                    <a href="/catalog"> U </a>
                </li>
                <li>
                    <a href="/catalog"> Каталог </a>
                </li>
            </ul>
          </div>
        </>
     );
}

export default Header;