import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
} from 'react-admin';
import { Edit } from 'react-admin';

// Список всех категорий
export const CategoriesList = props => (
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
      <TextInput source="description" label="Description" />
      {/* <NumberInput source="categoryId" label="Category ID" /> */}
    </SimpleForm>
  </Create>
);

// Редактирование продукта
export const ProductsEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <NumberInput source="price" label="Price" />
      <TextInput source="type" label="Type" />
      <BooleanInput source="availability" label="Available?" />
      <TextInput source="img" label="Image URL" />
      <TextInput source="code" label="Product Code" />
      <TextInput source="description" label="Description" />
      <NumberInput source="categoryId" label="Category ID" />
    </SimpleForm>
  </Edit>
);
