import React from 'react';
import classes from './AdminPage.module.css';
import { Admin, ListGuesser, Resource } from 'react-admin';

function AdminPage({ children, ...props }) {
  return <>
  <Admin>
  <Resource name="admin" list={ListGuesser} />
  </Admin>
  </>;
}

export default AdminPage;
