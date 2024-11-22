import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,

} from 'react-admin';
import { Edit } from 'react-admin';

// Список всех категорий
export const CategoriesList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Title" />
      <TextField source="img" label="Img" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание категории
export const CategoriesCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="img" label="Image URL" />
    </SimpleForm>
  </Create>
);

// Редактирование категории
export const CategoriesEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="img" label="Image URL" />
    </SimpleForm>
  </Edit>
);
