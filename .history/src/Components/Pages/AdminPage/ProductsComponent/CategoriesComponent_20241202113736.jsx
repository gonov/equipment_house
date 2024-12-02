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
  if (values.img) {
    // Загружаем файл и получаем путь к загруженному изображению
    const uploadedImage = await uploadFile(values.img);
    values.img = uploadedImage; // Сохраняем путь загруженного изображения
  }
  return values;
};

export const CategoriesCreate = (props) => (
  <Create {...props} transform={handleSave}>
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
  <Edit {...props} onSubmit={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <FileInput
        source="img"
        label="Загрузить изображения"
        accept="image/*"
        multiple
      >
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
