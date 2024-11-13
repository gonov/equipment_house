import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../Blocks/Header/Header';
import Footer from '../../Blocks/Footer/Footer';

function Empty({ children, ...props }) {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Выводим позиции прокрутки для отладки
      console.log("Scroll position:", scrollPosition);
      console.log("Document height:", documentHeight);
      
      if (scrollPosition >= documentHeight - 5) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
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
