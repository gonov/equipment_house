import React from 'react';
import classes from './AdminPage.module.css';
import { Admin, ListGuesser, Resource } from 'react-admin';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function AdminPage({ children, ...props }) {
  return (
    <>
    <CenterBlock\
      <Admin>
        <Resource name="admin" list={ListGuesser} />
      </Admin>
    </>
  );
}

export default AdminPage;
