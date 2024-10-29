import React from 'react'
import classes from './ProductCard.module.css';

export default function ProductCard({ children, ...props }) {
  return (
    <div className={classes.container}>
      <img src={product.img} alt=''></img>
      <div>{product.availability}</div>
      <div>{</div>
    </div>
  )
}
