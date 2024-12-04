import React, { useState } from "react";
import { useNotify, useRefresh } from "react-admin";
import { Button } from "@mui/material";
import { FileInput, FileField } from "react-admin";
import uploadsConfig from "../../../../uploadsConfig";

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const notify = useNotify();
  const refresh = useRefresh();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      notify("Выберите файл для загрузки", { type: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${uploadsConfig}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка при загрузке файла");

      notify("Файл успешно загружен", { type: "info" });
      refresh();
      setFile(null);
    } catch (error) {
      notify("Ошибка загрузки: " + error.message, { type: "error" });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <FileInput
        source="file"
        accept=".xml"
        onChange={handleFileChange}
        label="Выберите XML файл"
      >
        <FileField source="src" title="title" />
      </FileInput>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={!file}
      >
        Загрузить XML
      </Button>
    </div>
  );
};

export default UploadButton;
