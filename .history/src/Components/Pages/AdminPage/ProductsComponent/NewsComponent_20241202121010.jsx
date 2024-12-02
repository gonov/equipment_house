import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';

// Список всех категорий
export const NewsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название" />
      <TextField source="date" label="Дата" />
      <TextField source="description" label="Описание" />
      <TextField source="img" label="Картинка" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание категории

export const handleSave = async (values) => {
  if (values.img && values.img.length > 0) {
    const uploadedImages = await uploadFile(values.img);
    values.img = uploadedImages;
  }
  return values;
};

export const NewsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="date" label="Дата" />
      <TextInput source="description" label="Описание" />
      <TextInput source="img" label="Картинка URL" />
    </SimpleForm>
  </Create>
);

// Редактирование категории
export const NewsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="date" label="Дата" />
      <TextInput source="description" label="Описание" />
      <TextInput source="img" label="Картинка URL" />
    </SimpleForm>
  </Edit>
);
