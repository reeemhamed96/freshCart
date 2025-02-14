import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../../Components/CartProduct/CartProduct'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'

export default function Cart() {
    const [cartID, setcartID] = useState(null)
    const [cartData, setcartData] = useState(null)
    const [numofCartItems, setNumofCartItems] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [reqTimeOut, setReqTimeOut] = useState()
    useEffect(() => {
        getLoggedUserCart()
    }, [])

    async function getLoggedUserCart() {
        setisLoading(true)

        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        // console.log(data);
        setcartID(data.cartId)
        setcartData(data.data)
        setNumofCartItems(data.numOfCartItems)
        setisLoading(false)

    }

    async function removeCartProduct(productID) {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        setcartData(data.data)
        setNumofCartItems(data.numOfCartItems)

    }

    async function clearCart() {
        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setcartID(null)
        setcartData(null)
        setNumofCartItems(0)

    }

    function updateCartProduct(productID, count) {
        clearTimeout(reqTimeOut)
        // if (count > currentCount) {

        //     setIncrementIsLoading(true)

        // }
        // if (count < currentCount) {
        //     setDecrementIsLoading(true)

        // }
        setReqTimeOut(setTimeout(() => {
            axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
                count
            }, {
                headers: {
                    token: localStorage.getItem("token")

                }
            }).then(({ data }) => {
                console.log(data);
                setcartData(data.data)
                setNumofCartItems(data.numOfCartItems)
            })
            // .finally(() => {
            //     setDecrementIsLoading(false)
            //     setIncrementIsLoading(false)
            // })

        }, 2000))


    }


    if (isLoading) {
        return <LoadingScreen />


    }

    if (!numofCartItems) {
        return <h2 className='text-center text-3xl font-bold pt-10'>No products in your cart</h2>

    }


    return (<div className='container px-3'>
        <section
            className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50  mt-10">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div className="grid grid-cols-12">
                    <div
                        className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                            <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{numofCartItems} Items</h2>
                        </div>
                        <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                            <div className="col-span-12 md:col-span-7">
                                <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-3">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            cartData?.products.map((product, index) => {
                                return <CartProduct key={index} product={product} removeCartProduct={removeCartProduct} updateCartProduct={updateCartProduct} />
                            })
                        }

                        <div className="flex items-center justify-between mt-8">
                            <button
                                onClick={clearCart}
                                className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-red-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-red-700">
                                Clear Cart

                            </button>

                        </div>





                    </div>

                    <div
                        className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Order Summary</h2>
                        <div className="mt-8">
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">{numofCartItems} Items</p>
                                <p className="font-medium text-lg leading-8 text-black">${cartData?.totalCartPrice}</p>
                            </div>
                            <Link
                                to={"/address/" + cartID}
                                className="w-full text-center block bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">Checkout</Link>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    )
}
