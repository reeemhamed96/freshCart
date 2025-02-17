import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import Slider from "react-slick";
import { addToCart } from '../../Services/cartServices';
import RelatedProducts from '../../Components/RelatedProducts/RelatedProducts';
import { Button } from '@heroui/react';
import WishIcon from '../../Components/WishIcon/WishIcon';




export default function ProductDetails() {
    let { id } = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [relatedProduct, setRelatedProduct] = useState([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    useEffect(() => {
        getProductDetails()
    }, [id])


    function getProductDetails() {
        setIsLoading(true)

        axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id).then(({ data }) => {
            setProduct(data.data)
            getRelatedProducts(data.data.category._id)
            setIsLoading(false)


        })



    }

    async function getRelatedProducts(categoryID) {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryID}`)
        setRelatedProduct(data.data)

    }

    if (isLoading) {
        return <LoadingScreen />

    }
    return (

        <div className=" mx-auto bg-white  rounded-lg container pt-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-5 px-8  mb-5 items-center  gap-10 py-10 border rounded-lg">

                <div className="lg:col-span-2">
                    <div className=" ">
                        <Slider {...settings} arrows={false} className=' shadow-lg ' autoplay autoplaySpeed={5000} >
                            {
                                product?.images.map((img, i) => {
                                    return <img key={i} src={img} className="w-100 h-auto object-cover rounded-lg " />

                                })
                            }


                        </Slider>

                    </div>
                </div >

                < div className="lg:col-span-3" >
                    <div className='flex justify-between items-center pb-3'> <h1 className="text-2xl font-bold text-gray-800 mb-2">{product?.title}</h1>
                        <WishIcon productID={product?._id} />
                    </div>


                    <p className="text-sm text-gray-600 mb-4">{product?.description}</p>

                    <div className="flex items-center mb-4">
                        <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">{product?.ratingsAverage} ★</span>
                        <span className="text-sm text-gray-500 ml-2">{product?.ratingsQuantity} reviews</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-3xl font-bold text-gray-900">{product?.price}$</span>
                            <span className="ml-2 text-sm font-medium text-gray-500 line-through">{product?.price / 0.2}$</span>
                        </div>
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 20%</span>
                    </div>

                    <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>

                    <div className="flex space-x-4">

                        <Button onPress={() => {
                            addToCart(product?._id)
                        }} className='w-full bg-purple-900 text-white text-[18px]'
                            endContent={<i className='fa-solid fa-cart-shopping text-white'></i>}>
                            Add to Cart
                        </Button>
                    </div>
                </ div>
            </div >
            <RelatedProducts relatedProduct={relatedProduct} />



        </div >

    )
}
