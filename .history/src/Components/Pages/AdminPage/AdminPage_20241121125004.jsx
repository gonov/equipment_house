import React from 'react';
import classes from './AdminPage.module.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import simpleRestProvider from 'ra-data-simple-rest';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import {
  ProductsCreate,
  ProductsEdit,
  ProductsList,
} from './ProductsComponent/ProductsComponent';
import serverConfig from '../../../../serverConfig';

const dataProvider = simpleRestProvider(`${serverConfig}`);

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
