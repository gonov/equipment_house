import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageField,
  ImageInput,
} from 'react-admin';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Edit } from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

// Список всех категорий
export const CategoriesList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="comment" label="Comment" />
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
export const CategoriesEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      
      {/* Поле для редактирования старых и добавления новых изображений */}
      <ImageInput 
        source='imagesRaw' 
        label='Загрузить новые изображения' 
        multiple
        accept='image/*' 
      >
        <ImageField source='src' title='title' />
      </ImageInput>

      {/* Поле для отображения старых изображений, если они есть */}
      <ImageInput 
        source='img' 
        label='Старые изображения' 
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
            // Если это новый файл (имеет rawFile), вернем только его имя 
            if (file.rawFile) { 
              return file.rawFile;
            } 
            // Если это старое изображение (имеет только src), извлекаем имя файла
            return file.src.replace(`${uploadsConfig}`, '');
          })
        }
      >
        <ImageField source='src' title='title' />
      </ImageInput>

    </SimpleForm>
  </Edit>
);
