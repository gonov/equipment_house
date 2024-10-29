import React from 'react'
import classes from './ProductCard.module.css';



export default function ProductCard({ children, ...props, products }) {
  return (
    <div className={classes.container}>
      <img src={зкщвгсе.img} alt=''></img>
      <div>{зкщвгсе.availability}</div>
      <div>{зкщвгсе.name}</div>
      <div>{зкщвгсе.price}</div>
      <button>В корзину</button>
    </div>
  )
}
