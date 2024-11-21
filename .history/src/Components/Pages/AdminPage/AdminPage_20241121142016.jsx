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
import { AuthProvider } from './JS/authProvider';

const dataProvider = simpleRestProvider(`${serverConfig}`); // Ваш API

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
