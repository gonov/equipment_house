import React from 'react'
import classes from './ProductCard.module.css';

const products = () => {
{}
}

export default function ProductCard({ children, ...props }) {
  return (
    <div className={classes.container}>
      <img src={props.img} alt=''></img>
      <div>{props.availability}</div>
      <div>{props.name}</div>
      <div>{props.price}</div>
      <button>В корзину</button>
    </div>
  )
}
