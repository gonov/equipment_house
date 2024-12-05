import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Non_Found_Page from './Components/Pages/Non_Found_Page';
import Layout from './Components/Standart/Layout/Layout';
import Home_Page from './Components/Pages/Home_Page/Home_Page';
import CatalogPage from './Components/Pages/CatalogPage/CatalogPage';
import RegistrationPage from './Components/Pages/RegistrationPage/RegistrationPage';
import LoginPage from './Components/Pages/LoginPage/LoginPage';
import AdminPage from './Components/Pages/AdminPage/AdminPage';
import { AuthProvider } from './Components/AuthContext'; // Импортируем AuthProvider
import ProtectedRoute from './Components/ProtectedRoute'; // Импортируем ProtectedRoute
// Раскоментировать по одному в месяц
import ReadySolutionsPage from './Components/Pages/readySolutionsPage/ReadySolutionsPage';
import OneSolutionPage from './Components/Pages/OneSolutionPage/OneSolutionPage';
import NewsPage from './Components/Pages/NewsPage/NewsPage';
import OneNewsPage from './Components/Pages/OneNewsPage/OneNewsPage';
import CompanyPage from './Components/Pages/CompanyPage/CompanyPage';
import CategoryPage from './Components/Pages/CategoryPage/CategoryPage';
import BasketPage from './Components/Pages/BasketPage/BasketPage';
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage';
import OneProductPage from './Components/Pages/OneProductPage/OneProductPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home_Page />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
           {/* Раскоментировать по одному */}
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:productId" element={<OneProductPage />} /> */}
          {/* <Route path="/solutions" element={<ReadySolutionsPage />} /> */}
          {/* <Route path="/solutions/:id" element={<OneSolutionPage />} /> */}
          {/* <Route path="/category/:id" element={<CategoryPage />} /> */}
          {/* <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<OneNewsPage />} /> */}
          {/* <Route path="/company" element={<CompanyPage />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>

        {/* Защищенный маршрут для админов */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
