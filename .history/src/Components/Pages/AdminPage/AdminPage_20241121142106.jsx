import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {
  ProductsList,
  ProductsCreate,
  ProductsEdit,
} from './ProductsComponent/ProductsComponent';
import LoginPage from './LoginPage';
import serverConfig from '../../../../serverConfig';
import { authProvider } from './JS/authProvider';
import { fetchJsonWithToken } from './JS/fetchJsonWithToken';

const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API

const AdminPage = () => (
  <Admin
    basename="/admin"
    loginPage={<LoginPage />}
    authProvider={authProvider}
    dataProvider={dataProvider}
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
