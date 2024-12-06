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
import { uploadFile, uploadFiles } from '../JS/fileUploadUtils';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

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
      <ImageInput source="img" label="Загрузить изображение" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

// Редактирование категории
export const NewsEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="date" label="Дата" />
      <TextInput source="description" label="Описание" />
      <ImageInput
        source="imagesRaw"
        label="Загрузить новые изображения"
        multiple
        accept="image/*"
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      {/* Поле для отображения старых изображений, если они есть */}
      <ImageInput
        source="img"
        label="Старые изображения"
        multiple
        accept="image/*"
        format={(value) =>
          value && value.length
            ? value.map((image) => ({
                src: image.includes('http')
                  ? image
                  : `${uploadsConfig}${image}`,
                title: image,
              }))
            : []
        }
        parse={(value) =>
          value.map((file) => {
            // Если это новый файл (имеет rawFile), вернем только его имя
            if (file.rawFile) {
              return file.rawFile;
            }
            // Если это старое изображение (имеет только src), извлекаем имя файла
            return file.src.replace(`${uploadsConfig}`, '');
          })
        }
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
