import React from 'react';
import classes from './CatalogPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function CatalogPage({ children, ...props }) {
  return <>
  <CenterBlock>
    <WidthBlock>
      <div className={classes.catalogNme}
    </WidthBlock>
  </CenterBlock>
  </>;
}

export default CatalogPage;