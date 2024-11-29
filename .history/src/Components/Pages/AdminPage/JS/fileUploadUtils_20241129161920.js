export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('img', file);

  const response = await fetch('http://localhost:5000/uploads', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Ошибка загрузки файла');

  const data = await response.json();
  return data.filePaths;
};

export const uploadFiles = async (files) => {
  const uploadedFiles = await Promise.all(
    files.map((file) => uploadFile(file.rawFile))
  );
  return uploadedFiles.flat();
};
