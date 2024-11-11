import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../Blocks/Header/Header';
import Footer from '../../Blocks/Footer/Footer';

function Empty({ children, ...props }) {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Добавляем погрешность для корректного определения, что мы внизу страницы
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setShowFooter(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer className={showFooter ? 'show' : ''} /> {/* Передаем класс футеру */}
    </>
  );
}

export default Empty;
