import React from 'react';
import classes from './OneSolutionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useParams } from 'react-router-dom';
import { businessSolutions } from '../Bd';

function OneSolutionPage({ children, ...props }) {
  const { id } = useParams();
  const oneSolution = businessSolutions.find((el) => el.id === parseInt(id));

  if (!oneSolution) {
    return <
  }
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          {businessSolutions.map((solution) =>(
            <div key={solution.id} className={classes.container}></div>
          ))}
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneSolutionPage;
