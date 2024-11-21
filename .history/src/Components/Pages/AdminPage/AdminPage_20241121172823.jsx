import React from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import {
  ProductsList,
  ProductsCreate,
  ProductsEdit,
} from './ProductsComponent/ProductsComponent';
import LoginPage from './LoginPage';
import serverConfig from '../../../../serverConfig';
import authProvider from './JS/authProvider';
import { fetchJsonWithToken } from './JS/fetchJsonWithToken';
import { Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';

const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPage = () => (
  <Admin
    basename="/admin"
    loginPage={<LoginPage />}
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    customRoutes={
      <CustomRoutes>
        <Route path="/register" element={<RegisterPage />} />
      </CustomRoutes>
    }
  >
    <Resource
      name="products"
      list={ProductsList}
      create={ProductsCreate}
      edit={ProductsEdit}
    />
  </Admin>
);

export default AdminPage;
