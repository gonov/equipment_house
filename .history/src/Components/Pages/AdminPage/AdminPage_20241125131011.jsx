import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import {
  ProductsCreate,
  ProductsEdit,
  ProductsList,
} from './ProductsComponent/ProductsComponent';
import LoginPage from './LoginPage';
import serverConfig from '../../../../serverConfig';
import authProvider from './JS/authProvider';
import { fetchJsonWithToken } from './JS/fetchJsonWithToken';
import {
  CategoriesCreate,
  CategoriesEdit,
  CategoriesList,
} from './ProductsComponent/CategoriesComponent';

const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPage = () => (
  <Admin
    basename="/admin"
    loginPage={<LoginPage />}
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="products"
      list={ProductsList}
      create={ProductsCreate}
      edit={ProductsEdit}
    />
    <Resource
      name="categories"
      list={CategoriesList}
      create={CategoriesCreate}
      edit={CategoriesEdit}
    />
  </Admin>
      <Resource
      name="subCategories"
      list={SubCategoriesList}
      create={SubCategoriesCreate}
      edit={SubCategoriesEdit}
    />
  </Admin>
);

export default AdminPage;
