import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./ProductCard.module.css";
import serverConfig from "../../../../../serverConfig";
import uploadsConfig from "../../../../uploadsConfig";
// import uploadsConfig from "../../../../uploadsConfig";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

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

      alert("Товар успешно добавлен в корзину:", response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Пользователь не авторизован");
        navigate("/login");
      } else {
        console.error(
          "Ошибка при добавлении товара в корзину:",
          error.response?.data?.message || error.message
        );
      }
    }
  };

  const goToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={classes.card} onClick={goToProductPage}>
      <div className={classes.imageContainer}>
      <img src={product.img[0]} alt={product.name} />
      </div>
      <div className={classes.cardContent}>
        <span className={classes.productName}>{product.name}</span>
        <span className={classes.productPrice}>{product.price} ₽</span>
        <button className={classes.addToCartBtn} onClick={addToCart}>
          В корзину
        </button>
      </div>
    </div>
  );
}
