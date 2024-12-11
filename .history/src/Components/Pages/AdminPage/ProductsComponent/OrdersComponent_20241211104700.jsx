import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, ArrayField, ArrayInput, SimpleFormIterator, NumberInput, ReferenceInput, SelectInput, TextInput, SimpleForm, Edit } from 'react-admin';

// Редактирование заказа
export const OrdersEdit = (props) => {
  const [orderItems, setOrderItems] = React.useState(props.record.orderItems || []);

  // Функция для удаления товара
  const handleItemDelete = (productId) => {
    const updatedItems = orderItems.filter(item => item.productId !== productId);
    setOrderItems(updatedItems);
  };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="Имя" />
        <TextInput source="email" label="Email" />
        <TextInput source="adress" label="Адрес" />
        <TextInput source="total" label="Общая сумма" />
        <TextInput source="paymentMethod" label="Способ оплаты" />
        <TextInput source="phone" label="Телефон" />

        {/* Редактирование товаров в заказе */}
        <ArrayInput source="orderItems">
          <SimpleFormIterator>
            <ReferenceInput source="productId" reference="products">
              <SelectInput optionText="name" label="Продукт" />
            </ReferenceInput>
            <NumberInput source="quantity" label="Количество" />
            <NumberInput source="price" label="Цена" />

            {/* Кнопка для удаления товара */}
            <DeleteButton 
              label="Удалить товар" 
              onClick={() => handleItemDelete(props.record.productId)} 
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

// Список заказов
export const OrdersList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <TextField source="email" label="Email" />
      <TextField source="adress" label="Адрес" />
      <TextField source="total" label="Общая сумма" />
      <TextField source="paymentMethod" label="Способ оплаты" />
      <TextField source="phone" label="Телефон" />
      
      {/* Отображение списка товаров в заказе */}
      <ArrayField label="Товары в заказе" source="orderItems">
        <Datagrid>
          <TextField source="product.name" label="Продукт" />
          <TextField source="quantity" label="Количество" />
          <TextField source="price" label="Цена" />
        </Datagrid>
      </ArrayField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
