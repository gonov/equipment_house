import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default function AddComponent() {
  return <Create>
    <SimpleForm>
        <TextInput source='name' label=''/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
        <TextInput source='' label=''/>
    </SimpleForm>
  </Create>;
}
