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
    <p>Оборудование</p>
    <span>Тепловое</span>
    <span>Холодильное</span>
    <span>Электромеханическое</span>
    <span>Посудомоечное</span>
    <span>Нейтральное</span>
    <span>Линии раздачи</span>
</div>
<div className={classes.accessories}>
<p>Оборудование</p>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
<div className={classes.info}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>

</div>
<div className={classes.contacts}>
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