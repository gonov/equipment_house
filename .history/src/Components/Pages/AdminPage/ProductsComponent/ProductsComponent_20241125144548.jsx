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
    sort: { field: 'name', order: 'ASC' },
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
    id: category.id,
    name: `${category.name}${
      category.subCategories && category.subCategories.length
        ? ` (${category.subCategories.length} подкатегории)`
        : ''
    }`,
  }));

  return <SelectInput source={source} label={label} choices={choices} />;
};

// Список продуктов
export const ProductsList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <NumberField source="price" label="Price" />
      <TextField source="type" label="Type" />
      <BooleanField source="availability" label="Available?" />
      <TextField source="code" label="Product Code" />
      <TextField source="categoryId" label="Category ID" />
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
      <TextInput source="name" label="Name" />
      <NumberInput source="price" label="Price" />
      <TextInput source="type" label="Type" />
      <BooleanInput source="availability" label="Available?" />
      <TextInput source="img" label="Image URL" />
      <TextInput source="code" label="Product Code" />
      <TextInput source="description" label="Description" />
      <TextInput source="characteristics" label="Characteristics" />
      <CategorySelectInput source="categoryId" label="Category" />
      <NumberInput source="businessSolutionId" label="Business Solution ID" />
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
    </SimpleForm>
  </Edit>
);
