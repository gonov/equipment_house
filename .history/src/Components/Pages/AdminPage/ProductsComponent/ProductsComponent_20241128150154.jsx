import React, { useState } from 'react';
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
import axios from 'axios';
import Cookies from 'js-cookie';

// Компонент для выбора категории
const CategorySelectInput = ({ source, label }) => {
  const { data, isLoading, error } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' },
  });

  if (isLoading) {
    return <SelectInput source={source} label={label} choices={[]} disabled />;
  }

  if (error) {
    console.error('Ошибка загрузки категорий:', error);
    return null;
  }

  const choices = data.map((category) => ({
    id: category.id,
    name: category.title,
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Компонент для выбора подкатегории
const SubCategorySelectInput = ({ source, label }) => {
  const { data, isLoading, error } = useGetList('subcategories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' },
  });

  if (isLoading) {
    return <SelectInput source={source} label={label} choices={[]} disabled />;
  }

  if (error) {
    console.error('Ошибка загрузки подкатегорий:', error);
    return null;
  }

  const choices = data.map((subcategory) => ({
    id: subcategory.id,
    name: `${subcategory.title} (Категория: ${
      subcategory.categoryTitle || 'N/A'
    })`,
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
export const ProductsCreate = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);

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
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        ``,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      alert('Товар успешно создан!');
    } catch (error) {
      console.error('Ошибка:', error.response?.data?.message || error.message);
      alert('Ошибка: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label="Название товара" />
        <NumberInput source="price" label="Цена" />
        <TextInput source="type" label="Тип товара" />
        <BooleanInput source="availability" label="Наличие" />
        <FileInput source="img" label="Картинка" accept="image/*">
          <FileField source="src" title="title" />
        </FileInput>
        <TextInput source="code" label="Код товара" />
        <TextInput source="description" label="Описание товара" />
        {isLoading && <p>Загрузка...</p>}
      </SimpleForm>
    </Create>
  );
};

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
