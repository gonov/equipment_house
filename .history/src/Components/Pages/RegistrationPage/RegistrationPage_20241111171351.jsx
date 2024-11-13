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
              <input type="text" placeholder="ФИО" />
              <input type="text" placeholder="Телефон" />
              <input type="email" placeholder="E-mail" />
              <input
                type="text"
                placeholder="Введите название населенного пункта"
              />
              <p>
                Нажимая на кнопку "Отправить", я даю согласие на{' '}
                <a className={classes.containerFormLink} href="https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85">
                  обработку моих персональных данных.
                </a>{' '}
              </p>
              <div className={classes.containerFormButton}>
                <button>Назад</button>
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default RegistrationPage;
