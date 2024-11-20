import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default function AddComponent() {
  return <Create>
    <SimpleForm>
        <TextInput source='name' label='name'/>
        <TextInput source='price' label='price'/>
        <TextInput source='type' label='type'/>
        <TextInput source='availability' label='avail'/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
    </SimpleForm>
  </Create>;
}
