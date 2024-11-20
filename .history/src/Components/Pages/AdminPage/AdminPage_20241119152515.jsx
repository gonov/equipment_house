import React from 'react';
import classes from './AdminPage.module.css';
import { Admin, Resource } from 'react-admin';

function AdminPage({ children, ...props }) {
  return <>
  <Admin>
  <Resource name="posts" list={ListGuesser} />
  </Admin>
  </>;
}

export default AdminPage;
