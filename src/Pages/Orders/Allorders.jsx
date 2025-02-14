import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Contexts/AuthContext'
import axios from 'axios';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import { Accordion, AccordionItem } from '@heroui/react';

export default function Allorders() {
    const { userId } = useContext(authContext)
    const [orderData, SetOrderData] = useState([])
    const [isLoading, SetIsLoading] = useState(true)
    // console.log(userId);

    useEffect(() => {
        getUserOrders()

    }, [])

    function getUserOrders() {
        SetIsLoading(true)

        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then(({ data }) => {
            // console.log(data);
            SetOrderData(data)


        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            SetIsLoading(false)

        })

    }

    if (isLoading) {

        return <LoadingScreen />

    }
    return (

        <div className='container px-3 py-9'>
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                Payment Successful
            </h2>
            <p className="my-8 font-normal text-lg leading-8 text-gray-500  text-center">Thanks for making a purchase
                you can
                check our order summary below</p>

            {
                orderData.map((order, index) => {
                    return <Accordion variant="light" className='py-5 relative mb-5 border-b-1  main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full' key={index} >
                        <AccordionItem key="1" aria-label="Accordion 1" title={<p className="font-semibold text-base leading-7 text-black px-10">Order Id: <span className="text-indigo-600 font-medium">{order.id}</span></p>} subtitle={<p className="font-semibold text-base leading-7 text-black mt-4 px-10 ">Order Payment : <span className="text-gray-400 font-medium "> {order.createdAt.split("T")[0] + " at " + order.createdAt.split("T")[1].slice(0, (order.createdAt.split("T")[1].length) - 5)}</span></p>}>
                            <section >
                                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">

                                    <div className="">

                                        <div className="w-full px-3 min-[400px]:px-6">

                                            {
                                                order.cartItems.map((item, ind) => {

                                                    return <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full border-t" key={ind}>
                                                        <div className="img-box max-lg:w-full">
                                                            <img src={item.product.imageCover} alt={item.product.imageCover}
                                                                className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover" />
                                                        </div>
                                                        <div className="flex flex-row items-center w-full ">
                                                            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                                                <div className="flex items-center">
                                                                    <div className="">
                                                                        <h2 className="font-semibold text-xl leading-8 line-clamp-1 text-black mb-3">
                                                                            {item.product.title}</h2>
                                                                        {/* <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                                    By: Dust Studios</p> */}
                                                                        <div className="flex items-center ">

                                                                            <p className="font-medium text-base leading-7 text-black ">Qty: <span
                                                                                className="text-gray-500">{item.count}</span></p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="grid grid-cols-5 ">
                                                                    <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 lg:justify-end">
                                                                        <div className="flex gap-3 lg:block">
                                                                            <p className="font-medium text-sm leading-7 text-black">price</p>
                                                                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">{item.price} $</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-span-5 lg:col-span-3 flex items-center max-lg:mt-3  lg:justify-end">
                                                                        <div className="flex gap-3 lg:block">
                                                                            <p className="font-medium text-sm leading-7 text-black">Status
                                                                            </p>
                                                                            <p
                                                                                className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                                                                Ready for Delivery</p>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                })

                                            }



                                        </div>
                                        <div className="w-full  px-6  ">

                                            <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600">{order.
                                                totalOrderPrice
                                            } $</span></p>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </AccordionItem>

                    </Accordion>
                })
            }
        </div>


    )
}
