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
  SimpleFormIterator,
  ImageInput,
  ImageField,
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
import { uploadFiles } from '../JS/fileUploadUtils';
import { updateImages } from '../../AdminPage/JS/fileUploadUtils';

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
      <NumberField source="price" label="Price" />
      <FileField source="img" label="Images" title="Image" />
      <TextField source="categoryId" label="Category ID" />
      <TextField source="subCategoryId" label="Subcategory ID" />
      <TextField source="businessSolutionsId" label="Business Solution ID" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const handleSave = async (values) => {
  if (values.img && values.img.length > 0) {
    const uploadedImages = await uploadFiles(values.img);
    values.img = uploadedImages;
  }
  return values;
};

// Создание продукта
export const ProductsCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Название товара" />
      <NumberInput source="price" label="Цена" />
      <ImageInput source="img" label="Загрузить изображения" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="description" label="Описание товара" />
      <TextInput source="characteristics" label="Характеристики" />
      <CategorySelectInput source="categoryId" label="Категория" />
      <SubCategorySelectInput source="subCategoryId" label="Подкатегория" />
      <NumberInput
        source="businessSolutionId"
        label="Готовое решение для бизнеса"
      />
    </SimpleForm>
  </Create>
);

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

// Редактирование продукта
export const ProductsEdit = (props) => (
  <Edit {...props} onSubmit={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <NumberInput source="price" label="Price" />
      <FileInput
        source="img"
        label="Загрузить изображения"
        accept="image/*"
        multiple
      >
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="description" label="Description" />
      <CategorySelectInput source="categoryId" label="Category" />
      <SubCategorySelectInput source="subCategoryId" label="Subcategory" />
    </SimpleForm>
  </Edit>
);
