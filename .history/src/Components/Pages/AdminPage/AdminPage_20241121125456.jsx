import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { ProductsList, ProductsCreate, ProductsEdit } from './ProductsComponent';

const dataProvider = simpleRestProvider('http://localhost:5000'); // Ваш API

const AdminPage = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="products"
      list={ProductsList}
      create={ProductsCreate}
      edit={ProductsEdit}
    />
  </Admin>
);

export default AdminPage;
