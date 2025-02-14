import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'

export default function Brands() {
    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
    const { data, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getAllBrands,
        select: (data) => (data.data.data)

    })
    if (isLoading) {
        return <LoadingScreen />

    }
    return (
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10 container'>

            {
                data.map((brand, index) => {
                    return <div key={index} className=' border rounded-lg transition duration-75 hover:shadow-md hover:scale-[102%]'>
                        <img src={brand.image} alt="" />
                        <h3 className='text-center font-bold text-[20px] py-5  text-purple-900'>{brand.name}</h3>
                    </div>
                })

            }
        </div>
    )
}
