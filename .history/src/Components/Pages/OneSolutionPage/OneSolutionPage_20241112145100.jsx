import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';

function OneSolutionPage({ children, ...props }) {
  const { id } = useParams();
  return (
    <>
      <CenterBlock>
        <WidthBlock></WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
