import React from "react";
import WidthBlock from "../Standart/WidthBlock/WidthBlock";
import CenterBlock from "../Standart/CenterBlock/CenterBlock";

function Main_Page({ children, ...props }) {
    return ( 
        <>
        <CenterBlock><WidthBlock></WidthBlock>
        </CenterBlock>
        
            Main123
        </>
     );
}

export default Main_Page;