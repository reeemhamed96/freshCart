import { Button } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from '../../Services/cartServices'
import WishIcon from '../WishIcon/WishIcon'

export default function Product({ product }) {

    return (<div className=" mx-auto shadow-md border  transform overflow-hidden rounded-lg bg-white duration-300 hover:scale-[102%] hover:shadow-lg flex flex-col justify-between  ">

        <Link to={"/product/" + product._id} className=" pb-0" >
            <img className=" w-full" src={product.imageCover} alt="Product Image" />
            <div className='px-4 pt-2'>
                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-1">{product.title}</h2>
                <p className="mb-2 text-base dark:text-gray-300 text-gray-700 line-clamp-3">{product.description}</p>
                <div className="flex items-center ">
                    <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{product.price}$</p>
                    <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">{product.price / 0.2}$</p>
                    <p className="ml-auto text-base font-medium text-[#7b2cbf]">20% off</p>

                </div>
            </div>



        </Link>

        <div className='flex justify-between items-center px-3 py-5'> <Button onPress={() => {
            addToCart(product?._id)
        }} className='w-fit bg-purple-900 text-white' endContent={<i className='fa-solid fa-cart-shopping text-white'></i>}>
            Add to Cart
        </Button>

            <WishIcon productID={product?._id} />




        </div>

    </div>

    )
}
