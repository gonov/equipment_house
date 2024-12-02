import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageInput,
  ImageField,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';
import { uploadFile } from '../JS/fileUploadUtils';

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
    const uploadedImages = await uploadFiles(values.img);
    values.img = uploadedImages;
  }
  return values;
};

export const NewsCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="date" label="Дата" />
      <TextInput source="description" label="Описание" />
      <ImageInput source="img" label="Загрузить изображение">
        <ImageField source="src" title="title" />
      </ImageInput>
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
