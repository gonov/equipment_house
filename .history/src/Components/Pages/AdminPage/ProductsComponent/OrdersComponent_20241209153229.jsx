import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
  Create,
  Edit,
  ReferenceManyField,
  ChipField,
} from 'react-admin';
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils';
import uploadsConfig from '../../../../uploadsConfig';

// Список всех заказов
import { List, Datagrid, TextField, ReferenceManyField, EditButton, DeleteButton } from 'react-admin';

// Список всех заказов
export const OrdersList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <TextField source="email" label="Email" />
      <TextField source="adress" label="Адрес" />
      <TextField source="total" label="Общая сумма" />
      <TextField source="paymentMethod" label="Способ оплаты" />
      
      {/* Отображение списка товаров в заказе */}
      <ReferenceManyField
        label="Товары в заказе"
        reference="orderItems"
        target="orderId"
        allowEmpty
      >
        <Datagrid>
          <TextField source="product.name" label="Продукт" />
          <TextField source="quantity" label="Количество" />
          <TextField source="price" label="Цена" />
        </Datagrid>
      </ReferenceManyField>
      
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Создание нового заказа
export const OrdersCreate = (props) => (
  <Create {...props} transform={handleSave}>
    <SimpleForm>
      <TextInput source="name" label="Имя" />
      <TextInput source="email" label="Email" />
      <TextInput source="adress" label="Адрес" />
      <TextInput source="total" label="Общая сумма" />
      <TextInput source="paymentMethod" label="Способ оплаты" />
      <ImageInput source="img" label="Загрузить изображение" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

// Редактирование заказа
export const OrdersEdit = (props) => (
  <Edit {...props} transform={handleSaveWithImages}>
    <SimpleForm>
      <TextInput source="name" label="Имя" />
      <TextInput source="email" label="Email" />
      <TextInput source="adress" label="Адрес" />
      <TextInput source="total" label="Общая сумма" />
      <TextInput source="paymentMethod" label="Способ оплаты" />

    
    </SimpleForm>
  </Edit>
);
