import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageField,
  ImageInput,
  FileInput,
  FileField,
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
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <ImageInput source="img" label="Загрузить изображение" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

// Редактирование категории

export const handleSaveWithImages = async (values) => {
  const existingImages = values.img || []; // Старые изображения
  const newFiles = values.imagesRaw || []; // Новые загруженные файлы

  // Обновляем изображения (старые + новые)
  const updatedImages = await updateImages(existingImages, newFiles);

  // Сохраняем значения формы с обновленными изображениями
  values.img = updatedImages;

  // Удаляем временные поля
  delete values.imagesRaw;

  return values;
};

export const CategoriesEdit = (props) => (
  <Edit {...props} onSubmit={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <ImageInput source="images" label="Загрузить изображение" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
