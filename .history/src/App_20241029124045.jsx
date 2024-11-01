import React from "react";
import { Route, Routes } from "react-router-dom";


import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";

import Home_Page from "./Components/Pages/Home_Page/Home_Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path='/' element={<Home_Pagу/>}/>
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
