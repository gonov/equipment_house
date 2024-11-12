import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function OneSolutionPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock></WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
