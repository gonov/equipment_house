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
import { handleSaveWithImages, uploadFiles } from '../JS/fileUploadUtils';
import { updateImages } from '../../AdminPage/JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

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

// export const handleSaveWithImages = async (values) => {
//   const existingImages = values.img || []; // Старые изображения
//   const newFiles = values.imagesRaw || []; // Новые загруженные файлы

//   // Обновляем изображения (старые + новые)
//   const updatedImages = await updateImages(existingImages, newFiles);

//   // Сохраняем значения формы с обновленными изображениями
//   values.img = updatedImages;

//   // Удаляем временные поля
//   delete values.imagesRaw;

//   return values;
// };

export const CategoriesEdit = (props) => (
  <Edit {...props} onSubmit={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <ImageInput source="imagesRaw" label="Загрузить изображение" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
      {/* Поле для редактирования старых и добавления новых изображений */} 
   <ImageInput 
    source='img' 
    label='Изображения' 
    multiple 
    accept='image/*' 
    format={value => 
     value && value.length 
      ? value.map(image => ({ 
        src: image.includes('http') 
         ? image 
         : `${uploadsConfig}${image}`, 
        title: image 
       })) 
      : [] 
    } 
    parse={value => 
     value.map(file => { 
      // Если это новый файл (имеет rawImage), вернем только его имя 
      if (file.rawImage) { 
       return file.rawImage 
      } 
      // Если это старое изображение (имеет только src), извлекаем имя файла 
      return file.src.replace(`${uploadsConfig}`, '') 
     }) 
    } 
   > 
    <ImageField source='src' title='title' /> 
   </ImageInput> 
    </SimpleForm>
  </Edit>
);
