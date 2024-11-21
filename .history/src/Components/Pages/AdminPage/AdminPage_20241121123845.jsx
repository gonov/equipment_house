import React from 'react';
import classes from './AdminPage.module.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import simpleRestProvider from 'ra-data-simple-rest';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import AddComponent from './ProductsComponent/ProductsComponent';
import serverConfig from '../../../../serverConfig';

const dataProvider = simpleRestProvider(`${serverConfig}`);

function AdminPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <Admin basename="/admin" dataProvider={dataProvider}>
            <Resource
              name="products"
              list={ListGuesser}
              create={ProComponent}
            />
          </Admin>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default AdminPage;
