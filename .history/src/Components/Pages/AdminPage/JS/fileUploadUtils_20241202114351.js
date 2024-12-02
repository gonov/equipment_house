import Cookies from 'js-cookie';
import uploadsConfig from '../../../../uploadsConfig';

const token = Cookies.get('token');

// Функция для загрузки одного файла на сервер
const uploadFile = async (file) => {
  if (!file.rawFile) {
    throw new Error("Файл не содержит rawFile");
  }

  const formData = new FormData();
  formData.append("file", file.rawFile);

  console.log("Отправляемый formData:", formData);

  const response = await fetch("/uploads", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Ошибка загрузки файла:", errorText);
    throw new Error(`Ошибка загрузки файла: ${response.status}`);
  }

  const data = await response.json();
  return data.filePath;
};


// Функция для загрузки всех файлов перед сохранением формы
// export const uploadFiles = async (files) => {
//   const uploadedFiles = await Promise.all(
//     files.map((file) => uploadFile(file.rawFile))
//   );
//   return uploadedFiles.flat(); // Получаем плоский массив с ссылками на файлы
// };

// Для массива изображений
export const uploadFiles = async (files) => {
  const uploadedFiles = await Promise.all(
    files.map((file) => {
      if (file.rawFile) {
        return uploadFile(file.rawFile);
      } else {
        console.error('Файл не содержит rawFile:', file);
        throw new Error('Файл не содержит rawFile');
      }
    })
  );
  return uploadedFiles.flat();
};




// Функция для обработки сохранения формы
// export const handleSave = async values => {
// 	if (values.img && values.img.length > 0) {
// 		// Загружаем все изображения на сервер
// 		const uploadedImages = await uploadFiles(values.img)

// 		// Заменяем файлы ссылками на загруженные изображения
// 		values.img = uploadedImages
// 	}

// 	return values
// }

export const handleSave = async (values) => {
  if (values.img && values.img.length > 0) {
    // Загружаем файлы через API
    const uploadedImages = await uploadFiles(values.img);

    // Заменяем файлы ссылками на сервер
    values.img = uploadedImages;
  }

  // Убедитесь, что возвращаем объект данных
  return {
    ...values,
    img: values.img, // Добавляем пути к изображениям
  };
};

// Функция для обновления изображений
export const updateImages = async (existingImages = [], newFiles = []) => {
  // Загружаем новые файлы на сервер
  let uploadedImages = [];
  if (newFiles.length > 0) {
    uploadedImages = await uploadFiles(newFiles);
  }

  // Объединяем старые изображения с новыми и удаляем дубликаты
  const updatedImages = Array.from(
    new Set([...existingImages, ...uploadedImages])
  );

  return updatedImages;
};

// Функция для сохранения формы
export const handleSaveWithImages = async (values) => {
  const existingImages = values.img || []; // Старые изображения
  const newFiles = values.imagesRaw || []; // Новые загруженные файлы

  // Обновляем изображения (старые + новые)
  const updatedImages = await updateImages(existingImages, newFiles);

  // Сохраняем значения формы с обновленными изображениями
  values.img = updatedImages;

  // Удаляем временные поля
  delete values.imagesRaw;

  return values;
};
