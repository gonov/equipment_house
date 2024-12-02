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
import { uploadFiles } from '../JS/fileUploadUtils';
import { updateImages } from '../../AdminPage/JS/fileUploadUtils';

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

export const handleSave = async (values) => {
  if (values.img && values.img.length > 0) {
    const uploadedImages = await uploadFiles(values.img);
    values.img = uploadedImages;
  }
  return values;
};

export const CategoriesCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <ImageInput source="img" label="Загрузить изображения" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

// Редактирование категории

export const handleSaveWithImages = async (values) => {
  const updatedImages = await updateImages(
    values.images || [],
    values.imagesRaw || []
  );
  return {
    ...values,
    images: updatedImages,
    imagesRaw: undefined,
  };
};

export const CategoriesEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="img" label="Image URL" />
    </SimpleForm>
  </Edit>
);
