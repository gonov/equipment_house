import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin';

export default function AddComponent() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" label="Name" validate={required()} />
        <NumberInput source="price" label="Price" validate={required()} />
        <TextInput source="type" label="Type" />
        <BooleanInput source="availability" label="Available?" />
        <TextInput source="img" label="Image URL" />
        <TextInput source="code" label="Product Code" />
        <TextInput source="description" label="Description" />
        <NumberInput source="categoryId" label="Category ID" validate={required()} />
      </SimpleForm>
    </Create>
  );
}
