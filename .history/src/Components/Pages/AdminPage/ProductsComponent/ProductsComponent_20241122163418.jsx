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

// Список всех продуктов
export const ProductsList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <NumberField source="price" label="Price" />
      <TextField source="type" label="Type" />
      <BooleanField source="availability" label="Available?" />
      <TextField source="code" label="Product Code" />
      <TextField source="categoryId" label="Category" />
      <TextField source="code" label="Product Code" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание продукта
export const ProductsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <NumberInput source="price" label="Price" />
      <TextInput source="type" label="Type" />
      <BooleanInput source="availability" label="Available?" />
      <TextInput source="img" label="Image URL" />
      <TextInput source="code" label="Product Code" />
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
