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
          <img src='/images/registr.png' alt=''/>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default RegistrationPage;
