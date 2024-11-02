import React from "react";
import { Route, Routes } from "react-router-dom";


import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";

import Home_Page from "./Components/Pages/Home_Page/Home_Page";
import BasketPage from "./Components/Pages/BasketPage/BasketPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path='/' element={<Home_Page/>}/>
          <Route path='/basket' element={<BasketPage/>}/>
          <Route path='/profile' element={<Pro/>}/>
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
