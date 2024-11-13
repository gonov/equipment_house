import React from 'react';
import classes from './OneNewsPage.module.css';
import { useParams } from 'react-router-dom';

function OneNewsPage({ children, ...props }) {
  const { id } = useParams();
  const selectedNews = news.find((item) => item.id === parse)
  return <></>;
}

export default OneNewsPage;
