import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const FeedbacksList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="comment" label="Comment" />
      <TextField source="phone" label="Phone" />
      <TextField source="userId" label="User ID" />

      <DeleteButton />
    </Datagrid>
  </List>
);
