import React, { useState } from 'react';
import { useNotify, useRefresh } from 'react-admin';
import { Button, CircularProgress } from '@mui/material';
import serverConfig from '../../../../../serverConfig';

const UploadButton = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Проверка типа файла
    if (file.type !== 'application/xml' && !file.name.endsWith('.xml')) {
      notify('Ошибка: допустим только файл формата XML', { type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true); // Начало загрузки
      const response = await fetch(`${serverConfig}/upload-xml`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка при загрузке файла');

      const data = await response.json();
      notify(`Файл успешно загружен и обработан: ${data.message}`, { type: 'info' });
      refresh(); // Обновить данные
    } catch (error) {
      notify(`Ошибка загрузки: ${JSOerror}`, { type: 'error' });
    } finally {
      setLoading(false); // Окончание загрузки
    }
  };

  return (
    <Button variant="contained" component="label" color="primary" disabled={loading}>
      {loading ? <CircularProgress size={24} /> : 'Загрузить XML'}
      <input type="file" accept=".xml" hidden onChange={handleFileUpload} />
    </Button>
  );
};

export default UploadButton;
