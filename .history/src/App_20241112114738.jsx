import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Non_Found_Page from './Components/Pages/Non_Found_Page';
import Layout from './Components/Standart/Layout/Layout';

import Home_Page from './Components/Pages/Home_Page/Home_Page';
import BasketPage from './Components/Pages/BasketPage/BasketPage';
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage';
import OneProductPage from './Components/Pages/OneProductPage/OneProductPage';
import CatalogPage from './Components/Pages/CatalogPage/CatalogPage';
import CategoryPage from './Components/Pages/CategoryPage/CategoryPage';
import RegistrationPage from './Components/Pages/RegistrationPage/RegistrationPage';
import LoginPage from './Components/Pages/LoginPage/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path="/" element={<Home_Page />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/oneProductPage" element={<OneProductPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog" element={<Rea />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
