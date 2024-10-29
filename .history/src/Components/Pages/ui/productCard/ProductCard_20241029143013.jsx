import React from 'react'
import classes from './ProductCard.module.css';

const products = () => {
[  {
    id: 1,
    name: 'Мясорубка 1000ватт',
    price: 1000,
    img: '/images/group3.png'
  }]
}

export default function ProductCard({ children, ...props, produ }) {
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
