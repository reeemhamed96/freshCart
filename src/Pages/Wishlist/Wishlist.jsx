import { Button } from '@heroui/react';
import React, { useContext, useEffect, useState } from 'react'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import { addToCart } from '../../Services/cartServices';
import { Link } from 'react-router-dom';
import { wishlistContext } from '../../Contexts/WishlistContext';


export default function Wishlist() {
    const { isLoading, wishlistData, deleteFromWishlist, setWishlistData, getUserWishlist } = useContext(wishlistContext)

    useEffect(() => {
        getUserWishlist()


    }, [])



    function getupdatedWishlist(productID) {

        return wishlistData.filter((el) => {
            return el._id !== productID


        })
    }


    if (isLoading) {
        return <LoadingScreen />


    }
    if (!wishlistData.length) {

        return <h2 className='text-center pt-10 font-extrabold text-large '>No product in Wishlist</h2>

    }

    return (



        <div className='container px-3'><div className='w-full max-w-6xl px-3 md:px-5 lg-6 mx-auto border py-5 mt-5 shadow-md   '>
            <div className='flex items-center justify-between pb-5 border-b border-gray-300 mb-5'>
                <h2 className='font-manrope font-bold text-3xl leading-10 text-black '>My Wishlist</h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{wishlistData.length}{wishlistData.length == 1 ? " Item" : " Items"}</h2>
            </div>
            {
                wishlistData.map((product, index) => {


                    return <div key={index} className='bg-slate-50 pt-3 grid gap-10 md:grid-cols-4 border rounded-lg py-4 px-3 mb-4  items-center relative '>

                        <div className='lg:col-span-1 ' >
                            <img src={product.imageCover} alt={product.imageCover} className='rounded ' />
                        </div>

                        <div className='lg:col-span-3 text-center md:text-start '>
                            <div><Link to={"/product/" + product?._id} className='line-clamp-1 text-2xl font-bold text-gray-800 hover:text-gray-700 mb-2'>{product.title}</Link>
                                <div className=" mb-4"> <span className='mr-2 text-lg font-semibold text-gray-900 dark:text-white'>{product.price} $</span>
                                    <span className="ml-2 text-sm font-medium text-gray-500 line-through">{product?.price / 0.2}$</span></div>

                                <Button onPress={() => {
                                    addToCart(product._id)

                                }} className='bg-purple-900 text-white w-40' endContent={<i className='fa-solid fa-cart-shopping text-white'></i>}>Add to Cart</Button>






                            </div>
                            <i className='fa-solid fa-close text-slate-500 cursor-pointer fa-xl absolute top-5 end-3' onClick={() => {

                                deleteFromWishlist(product?._id)
                                setWishlistData(getupdatedWishlist(product._id))


                            }}></i>


                        </div>


                    </div>





                })
            }
        </div></div>
    )
}
