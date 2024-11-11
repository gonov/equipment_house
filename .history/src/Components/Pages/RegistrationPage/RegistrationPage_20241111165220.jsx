import React from 'react';
import classes from './RegistrationPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function RegistrationPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <img src="/images/registr.png" alt="" />
            <span>Регистрация</span>
            <span>Заполните все поля для регистарции</span>
            <
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default RegistrationPage;
