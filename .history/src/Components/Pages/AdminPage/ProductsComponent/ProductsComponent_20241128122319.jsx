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
    name: `${subcategory.title} (Категория: ${subcategory.categoryTitle || 'N/A'})`, // Название подкатегории и категории
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Список продуктов
export const ProductsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название товара" />
      <NumberField source="price" label="Price" />
      <TextField source="type" label="Type" />
      <BooleanField source="availability" label="Available?" />
      <TextField source="code" label="Product Code" />
      <TextField source="categoryId" label="Category ID" />
      <TextField source="subCategoryId" label="Subcategory ID" />
      <TextField source="businessSolutionsId" label="Business Solution ID" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание продукта
export const ProductsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название товара" />
      <NumberInput source="price" label="Цена" />
      <TextInput source="type" label="Тип товара (новинка, хит)" />
      <BooleanInput source="availability" label="Наличие товара" />
      <FileInput source="img" label="Картинка" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="code" label="Код товара" />
      <TextInput source="description" label="Описание товара" />
      <TextInput source="characteristics" label="Характеристики" />
      <CategorySelectInput source="categoryId" label="Категория" />
      <SubCategorySelectInput source="subCategoryId" label="Подкатегория" />
      <NumberInput source="businessSolutionId" label="Готовое решение для бизнеса" />
    </SimpleForm>
  </Create>
);

// Редактирование продукта
export const ProductsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <NumberInput source="price" label="Price" />
      <TextInput source="type" label="Type" />
      <BooleanInput source="availability" label="Available?" />
      <TextInput source="img" label="Image URL" />
      <TextInput source="code" label="Product Code" />
      <TextInput source="description" label="Description" />
      <CategorySelectInput source="categoryId" label="Category" />
      <SubCategorySelectInput source="subCategoryId" label="Subcategory" />
    </SimpleForm>
  </Edit>
);
