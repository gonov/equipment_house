import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../Blocks/Header/Header"
import Footer from "../../Blocks/Footer/Footer";


function Empty({ children, ...props }) {

    const [showFooter, setShowFooter]

    return (
        <>
            <Header/>
            <Outlet />
            <Footer/>
        </>
    );
}

export default Empty;