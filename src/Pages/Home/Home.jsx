import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Product from '../../Components/Product/Product';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import banner from "../../assets/sale.jpg"
import { wishlistContext } from '../../Contexts/WishlistContext';
export default function Home() {
    const [products, setProducts] = useState([])
    const [isLoad, setIsLoad] = useState([])
    const { isLoading } = useContext(wishlistContext)


    useEffect(() => {
        getAllProduct()

    }, [])

    function getAllProduct() {
        setIsLoad(true)

        axios.get("https://ecommerce.routemisr.com/api/v1/products").then(({ data }) => {
            // console.log(data.data);
            setProducts(data.data)



        }).finally(() => {
            setIsLoad(false)
        })



    }

    if (isLoad || isLoading) {
        return <LoadingScreen />


    }
    return (
        <div >
            <div><img src={banner} alt="sale" className=' h-96 object-cover w-full  ' /></div>
            <div className='container mx-auto py-9 px-3'> <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-7 ">
                {
                    products.map((product, index) => {
                        return <Product key={index} product={product} />


                    })
                }
            </div></div>
        </div>

    )
}
