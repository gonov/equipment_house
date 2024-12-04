import React from "react";
import { useNotify, useRefresh } from "react-admin";
import { Button } from "@mui/material";
import uploadsConfig from "../../../../uploadsConfig";
import serverConfig from "../../../../../serverConfig";

const UploadButton = () => {
  const notify = useNotify();
  const refresh = useRefresh();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${serverConfig}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка при загрузке файла");

      notify("Файл успешно загружен", { type: "info" });
      refresh();
    } catch (error) {
      notify("Ошибка загрузки: " + error.message, { type: "error" });
    }
  };

  return (
    <Button
      variant="contained"
      component="label"
      color="primary"
    >
      Загрузить XML
      <input
        type="file"
        accept=".xml"
        hidden
        onChange={handleFileUpload}
      />
    </Button>
  );
};

export default UploadButton;
