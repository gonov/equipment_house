import React from 'react';
import classes from './CompanyPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function CompanyPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <span>О компании</span>
            <span>...</span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default CompanyPage;
