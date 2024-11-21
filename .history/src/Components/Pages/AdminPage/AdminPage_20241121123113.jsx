import React from 'react';
import classes from './AdminPage.module.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import AddComponent from './AddComponent/AddComponent';

function AdminPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <Admin
          basename=''
          >
            <Resource
              name="products"
              list={ListGuesser}
              create={AddComponent}
            />
          </Admin>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default AdminPage;
