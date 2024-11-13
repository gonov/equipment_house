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
    <span>Тепловое</span>
    <span>Холодильное</span>
    <span>Электромеханическое</span>
    <span>Посудомоечное</span>
    <span>Нейтральное</span>
    <span>Линии раздачи</span>
</div>

            </WidthBlock>
           </CenterBlock>
           </div>
        </>
     );
}

export default Footer;