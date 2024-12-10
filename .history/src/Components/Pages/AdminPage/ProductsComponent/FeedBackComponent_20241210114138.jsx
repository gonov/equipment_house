import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const FeedbacksList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="comment" label="Comment" />
      <TextField source="phone" label="Phone" />
      <TextField source="userId" label="User ID" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
