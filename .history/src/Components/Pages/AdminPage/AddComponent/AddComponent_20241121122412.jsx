import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default function AddComponent() {
  return (
    <Create>
import { NumberInput, BooleanInput } from 'react-admin';

<SimpleForm>
    <TextInput source="name" label="Name" />
    <NumberInput source="price" label="Price" />
    <TextInput source="type" label="Type" />
    <BooleanInput source="availability" label="Available?" />
    <TextInput source="img" label="Image URL" />
    <TextInput source="code" label="Product Code" />
    <TextInput source="description" label="Description" />
    <NumberInput source="categoryId" label="Category ID" />
</SimpleForm>

    </Create>
  );
}
