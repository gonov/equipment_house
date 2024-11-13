import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { businessSolutions } from '../Bd';

function OneSolutionPage({ children, ...props }) {
  const { id } = useParams();
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          {businessSolutions.map((solution) =>(
            <div key={}
          ))}
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
