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
// import LoginPage from './LoginPage1';
import serverConfig from '../../../../serverConfig';
// import authProvider from './JS/authProvider';
import { fetchJsonWithToken } from './JS/fetchJsonWithToken';
import {
  CategoriesCreate,
  CategoriesEdit,
  CategoriesList,
} from './ProductsComponent/CategoriesComponent';
import {
  SubCategoryCreate,
  SubCategoryEdit,
  SubCategoryList,
} from './ProductsComponent/SubCategoriesComponent';
import {
  NewsCreate,
  NewsEdit,
  NewsList,
} from './ProductsComponent/NewsComponent';
import UploadButton from './ProductsComponent/XmlComponent';
import {  OrdersList } from './ProductsComponent/OrdersComponent';

const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken); // Ваш API
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPage = () => (
  <Admin
    basename="/admin"
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
    <Resource
      name="subCategories"
      list={SubCategoryList}
      create={SubCategoryCreate}
      edit={SubCategoryEdit}
    />
    <Resource name="News" list={NewsList} create={NewsCreate} edit={NewsEdit} />
    <Resource
      name="offers"
      options={{ label: 'Загрузка XML' }}
      list={() => (
        <div>
          <UploadButton />
        </div>
      )}
    />
       <Resource
      name="orders"
      list={OrdersList}
      // create={SubCategoryCreate}
      // edit={OrdersEdit}
    />
     <Resource
      name="feedBack"
      list={SubCategoryList}
      create={SubCategoryCreate}
      edit={SubCategoryEdit}
    />
  </Admin>
);

export default AdminPage;
