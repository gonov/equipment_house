import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  required,
  Datagrid,
  List,
  TextField,
  ArrayField,
  EditButton,
  DeleteButton,
} from 'react-admin';

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

// Редактирование заказа
// Редактирование заказа
// Редактирование заказа

// Редактирование заказа
export const OrdersEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Имя" validate={required()} />
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput source="adress" label="Адрес" validate={required()} />
      <TextInput source="total" label="Общая сумма" validate={required()} />
      <TextInput
        source="paymentMethod"
        label="Способ оплаты"
        validate={required()}
      />
      <TextInput source="phone" label="Телефон" validate={required()} />

      {/* Редактирование товаров в заказе */}
      <ArrayInput source="orderItems" validate={required()}>
        <SimpleFormIterator>
          <ReferenceInput
            source="productId"
            reference="products"
            label="Продукт"
            validate={required()}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
          <NumberInput
            source="quantity"
            label="Количество"
            validate={required()}
          />
          <NumberInput source="price" label="Цена" validate={required()} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
