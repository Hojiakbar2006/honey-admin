import React from 'react'
import { useSelector } from 'react-redux';
import { ProductCard } from '../../Components/TableCard/ProductCard';

export default function Product() {
    const product = useSelector((state)=>state.product)
  return (
    <section id='tabCard'>
        <ProductCard data = {product}/>
    </section>
  )
}
