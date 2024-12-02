import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { Edit } from 'react-admin';

// Список подкатегорий
export const SubCategoryList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название" />
      <ReferenceField
        source="categoryId"
        reference="categories"
        label="Категория"
      >
        <TextField source="title" />
      </ReferenceField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание подкатегории
export const SubCategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Название" />
      <ReferenceInput
        source="categoryId"
        reference="categories"
        label="Категория"
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

// Редактирование подкатегории
export const SubCategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Название" />
      <ReferenceInput
        source="categoryId"
        reference="categories"
        label="Категория"
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
