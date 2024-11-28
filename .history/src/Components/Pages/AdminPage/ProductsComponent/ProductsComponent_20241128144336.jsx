import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  SelectInput,
  FileInput,
  FileField,
} from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  useGetList,
} from 'react-admin';
import { Edit } from 'react-admin';
import { ImageField } from 'react-admin';

const CustomFileUpload = async (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price', data.price);
  formData.append('type', data.type);
  formData.append('availability', data.availability);
  formData.append('code', data.code);
  formData.append('description', data.description);

  // Добавляем файл, если он существует
  if (data.img && data.img.rawFile) {
    formData.append('img', data.img.rawFile);
  } else {
    throw new Error('Файл изображения обязателен');
  }

  const response = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при создании товара');
  }

  return response.json();
};
// Компонент для выбора категории
const CategorySelectInput = ({ source, label }) => {
  const { data, isLoading, error } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' }, // Сортировка по существующему полю
  });

  if (isLoading) {
    return <SelectInput source={source} label={label} choices={[]} disabled />;
  }

  if (error) {
    console.error('Ошибка загрузки категорий:', error);
    return null;
  }

  // Преобразование данных для SelectInput
  const choices = data.map((category) => ({
    id: category.id, // Идентификатор категории
    name: category.title, // Название категории
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Компонент для выбора подкатегории
const SubCategorySelectInput = ({ source, label }) => {
  const { data, isLoading, error } = useGetList('subcategories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' }, // Сортировка по существующему полю
  });

  if (isLoading) {
    return <SelectInput source={source} label={label} choices={[]} disabled />;
  }

  if (error) {
    console.error('Ошибка загрузки подкатегорий:', error);
    return null;
  }

  // Преобразование данных для SelectInput
  const choices = data.map((subcategory) => ({
    id: subcategory.id, // Идентификатор подкатегории
    name: `${subcategory.title} (Категория: ${
      subcategory.categoryTitle || 'N/A'
    })`, // Название подкатегории и категории
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Список продуктов

export const ProductsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название товара" />
      <NumberField source="price" label="Цена" />
      <BooleanField source="availability" label="Наличие?" />
      <ImageField source="img" label="Картинка" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание продукта
export const ProductsCreate = (props) => (
  <Create {...props}>
    <SimpleForm
      onSubmit={async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('type', data.type);
        formData.append('availability', data.availability);
        formData.append('code', data.code);
        formData.append('description', data.description);

        if (data.img && data.img.rawFile) {
          formData.append('img', data.img.rawFile);
        } else {
          alert('Пожалуйста, добавьте изображение!');
          return;
        }

        try {
          const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при создании товара');
          }

          alert('Товар успешно создан!');
        } catch (error) {
          console.error(error.message);
          alert('Ошибка: ' + error.message);
        }
      }}
    >
      <TextInput source="name" label="Название товара" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="type" label="Тип товара" />
      <BooleanInput source="availability" label="Наличие" />
      <FileInput source="img" label="Картинка" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="code" label="Код товара" />
      <TextInput source="description" label="Описание товара" />
    </SimpleForm>
  </Create>
);

// Редактирование продукта
export const ProductsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название товара" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="type" label="Тип товара" />
      <BooleanInput source="availability" label="Наличие товара" />
      <FileInput source="img" label="Картинка" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="code" label="Код товара" />
      <TextInput source="description" label="Описание товара" />
      <TextInput source="characteristics" label="Характеристики" />
      <CategorySelectInput source="categoryId" label="Категория" />
      <SubCategorySelectInput source="subCategoryId" label="Подкатегория" />
    </SimpleForm>
  </Edit>
);
