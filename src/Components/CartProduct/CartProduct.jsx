import { Button } from '@heroui/react'
import React, { useEffect, useState } from 'react'

export default function CartProduct({ product, removeCartProduct, updateCartProduct }) {

    const [incrementIsLoading, setIncrementIsLoading] = useState(false)
    const [decrementIsLoading, setDecrementIsLoading] = useState(false)

    const [productCount, setProductCount] = useState(product.count)


    return (
        <div
            className="flex relative flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
            <i className='fa-solid fa-trash absolute text-red-500 top-10 end-5 cursor-pointer' onClick={() => {
                removeCartProduct(product.product._id)
            }}></i>
            <div className="w-full md:max-w-[126px]">
                <img src={product.product.imageCover} alt={product.product.imageCover}
                    className="mx-auto rounded-xl object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black line-clamp-1">{product.product.title}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{product.product.category.name}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${product.price}</h6>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                        <Button
                            // isLoading={decrementIsLoading}
                            onPress={() => {
                                setProductCount(productCount - 1)
                                updateCartProduct(product.product._id, productCount - 1)
                                // updateCartProduct(product.product._id, product.count, product.count - 1, setDecrementIsLoading, setIncrementIsLoading)
                            }}
                            // isDisabled={product.count == 1}
                            isDisabled={productCount == 1}

                            className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                viewBox="0 0 22 22" fill="none">
                                <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                    strokeLinecap="round" />
                                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                    strokeLinecap="round" />
                                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                    strokeLinecap="round" />
                            </svg>
                        </Button>
                        <input type="text" value={productCount}
                            onChange={(el) => {

                                setProductCount(el.target.value);
                                el.target.value > 0 && updateCartProduct(product.product._id, el.target.value)

                            }}
                            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                        />
                        <Button
                            // isLoading={incrementIsLoading}
                            onPress={() => {
                                setProductCount(productCount + 1)
                                updateCartProduct(product.product._id, productCount + 1)

                                // updateCartProduct(product.product._id, product.count, product.count + 1, setDecrementIsLoading, setIncrementIsLoading)
                            }}
                            className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                viewBox="0 0 22 22" fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                    strokeLinecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                    strokeWidth="1.6" strokeLinecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                    strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">${product.price * productCount}</p>
                </div>
            </div>
        </div>
    )
}

