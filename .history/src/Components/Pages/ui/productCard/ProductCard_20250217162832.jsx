import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./ProductCard.module.css";
import serverConfig from "../../../../../serverConfig";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";  // Для более стилизованных алертов

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const addToCart = async (e) => {
    e.stopPropagation(); // предотвращаем переход на страницу товара при клике на кнопку

    try {
      const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) {
        console.error("Токен не найден в куки");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${serverConfig}/cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setSnackbarMessage("Товар успешно добавлен в корзину");
      setOpenSnackbar(true); // Открыть Snackbar
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Пользователь не авторизован");
        navigate("/login");
      } else {
        setSnackbarMessage(
          "Ошибка при добавлении товара в корзину: " +
            (error.response?.data?.message || error.message)
        );
        setOpenSnackbar(true); // Открыть Snackbar с ошибкой
      }
    }
  };

  const goToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={classes.card} onClick={goToProductPage}>
      <div className={classes.imageContainer}>
        <img src={product.img[0]} alt={product.name} />
      </div>
      <div className={classes.cardContent}>
        <span className={classes.productName}>{product.name}</span>
        <span className={classes.productPrice}>
          {Number(product.price).toLocaleString("ru-RU")} ₽
        </span>
        <button className={classes.addToCartBtn} onClick={addToCart}>
          В корзину
        </button>
      </div>

      {/* Snackbar для отображения сообщений */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Прячется через 3 секунды
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
