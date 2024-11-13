import React from 'react';
import classes from './OneNewsPage.module.css';
import { useParams } from 'react-router-dom';
import { news } from '../Bd';

function OneNewsPage({ children, ...props }) {
  const { id } = useParams();
  const selectedNews = news.find((item) => item.id === parseInt(id));

  if (!selectedNews) {
    <div>Новость не найдена</div>;
  }

  return (
    <>
      <img src={selectedNews.img} alt="" />
      <
    </>
  );
}

export default OneNewsPage;
