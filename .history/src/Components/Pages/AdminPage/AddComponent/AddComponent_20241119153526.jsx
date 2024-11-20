import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default function AddComponent() {
  return <Create>
    <SimpleForm>
        <TextInput source='name' label='name'/>
        <TextInput source='price' label='price'/>
        <TextInput source='type' label='type'/>
        <TextInput source='availability' label='availability'/>
        <TextInput source='img' label='img'/>
        <TextInput source='code' label='code'/>
        <TextInput source='description' label='description'/>
        <TextInput source='categoryId' label='categoryId'/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
    </SimpleForm>
  </Create>;
}
