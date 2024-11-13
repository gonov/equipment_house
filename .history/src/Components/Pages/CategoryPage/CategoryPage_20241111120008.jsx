import React from 'react';
import classes from './CategoryPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function CategoryPage({ children, ...props }) {
  const {id} = useParams
  return <>
    <CenterBlock>
    <WidthBlock>
   
    </WidthBlock>
  </CenterBlock>
  </>;
}

export default CategoryPage;
