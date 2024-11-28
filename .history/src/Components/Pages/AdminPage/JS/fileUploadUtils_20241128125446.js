import Cookies from 'js-cookie';
import uploadsConfig from '../../../../uploadsConfig';

const token = Cookies.get('token');

// Обработка ошибок
const handleError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

// Загрузка одного файла
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('images', file);

  try {
    const response = await fetch(
      `${uploadsConfig.baseURL}${uploadsConfig.endpoint}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    return data.filePaths; // Возвращает массив ссылок
  } catch (error) {
    handleError(error, 'Ошибка при загрузке файла');
  }
};

// Загрузка нескольких файлов
export const uploadFiles = async (files) => {
  const results = await Promise.allSettled(
    files.map((file) => uploadFile(file.rawFile))
  );

  const uploadedFiles = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);

  const errors = results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  if (errors.length > 0) {
    console.warn('Некоторые файлы не были загружены:', errors);
  }

  return uploadedFiles.flat();
};

// Обновление изображений
export const updateImages = async (existingImages = [], newFiles = []) => {
  const uploadedImages = await uploadFiles(newFiles);
  return Array.from(new Set([...existingImages, ...uploadedImages]));
};

// Сохранение формы
export const handleSaveWithImages = async (values) => {
  const updatedImages = await updateImages(
    values.images || [],
    values.imagesRaw || []
  );
  return {
    ...values,
    images: updatedImages,
    imagesRaw: undefined,
  };
};
