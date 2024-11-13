import React from "react";
import classes from './Footer.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Footer({ children, ...props }) {
    return ( 
        <>
        <div className={classes.footer}>
           <CenterBlock>
            <WidthBlock>
<div className={classes.equipment}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
            </WidthBlock>
           </CenterBlock>
           </div>
        </>
     );
}

export default Footer;