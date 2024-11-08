import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../Blocks/Header/Header';
import Footer from '../../Blocks/Footer/Footer';

function Empty({ children, ...props }) {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        setShowFooter(isAtBottom)
    };

    window.addEventListener('scroll', handleScroll);
    return 
  })

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Empty;