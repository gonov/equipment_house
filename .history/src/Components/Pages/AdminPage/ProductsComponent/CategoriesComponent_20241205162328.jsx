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
  // Обновляем изображения (если есть новые) и сохраняем
  const updatedImages = await updateImages(
    values.img || [], // Существующие изображения
    values.imgRaw || [] // Новые изображения (если были выбраны)
  );

  return {
    ...values,
    img: updatedImages, // Обновленное поле с изображениями
    imgRaw: undefined, // Убираем raw данные, если они есть
  };
};

// Компонент для редактирования категории
export const CategoriesEdit = (props) => (
  <Edit {...props} onSubmit={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Title" />

      {/* Загрузка изображений */}
      <FileInput
        source="imgRaw" // raw данные изображений, которые еще не загружены на сервер
        label="Загрузить изображения"
        accept="image/*"
        multiple
      >
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);