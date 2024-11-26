import React, { useState, useEffect } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './Home_Page.module.css';
import ProductCard from '../ui/productCard/ProductCard';

export default function Home_Page() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Передача токена
          },
        });
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  if (!Array.isArray(products)) {
    return <div>Ошибка: данные не являются массивом</div>;
  }

  return (
    <div>
      <h1>Товары</h1>
      <Swiper
        className={classes.sliderBox}
        spaceBetween={70}
        slidesPerView={4}
        loop={products.length > 4}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
