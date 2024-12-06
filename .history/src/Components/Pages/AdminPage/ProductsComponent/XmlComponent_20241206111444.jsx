import React from 'react';
import { useNotify, useRefresh } from 'react-admin';
import { Button } from '@mui/material';
import serverConfig from '../../../../../serverConfig';

const UploadButton = () => {
  const notify = useNotify();
  const refresh = useRefresh();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Проверка типа файла
    if (file.type !== 'application/xml') {
      notify('Ошибка: выбран файл не является XML!', { type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${serverConfig}/upload-xml`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Получаем информацию об ошибке с сервера
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при загрузке файла');
      }

      const data = await response.json();
      notify(`Файл успешно загружен и обработан: ${data.message}`, { type: 'info' });
      refresh(); // Обновление страницы, если нужно
    } catch (error) {
      console.error(error); // Выводим ошибку в консоль для отладки
      notify(`Ошибка загрузки: ${error.message}`, { type: 'error' });
    }
  };

  return (
    <Button variant="contained" component="label" color="primary">
      Загрузить XML
      <input type="file" accept=".xml" hidden onChange={handleFileUpload} />
    </Button>
  );
};

export default UploadButton;
