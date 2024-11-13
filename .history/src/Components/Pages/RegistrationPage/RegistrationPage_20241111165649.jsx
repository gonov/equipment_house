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
            <div className={classes.containerForm}>
              <input type='text' placeholder='ФИО'/>
              <input type='text' placeholder='Телефон'/>
              <input type='email' placeholder='E-mail'/>
              <input type='text' placeholder='Введите название населенного пункта'/>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default RegistrationPage;
