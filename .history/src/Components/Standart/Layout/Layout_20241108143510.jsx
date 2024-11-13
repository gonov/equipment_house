import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../Blocks/Header/Header';
import Footer from '../../Blocks/Footer/Footer';

function Empty({ children, ...props }) {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = 9
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
