import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'

export default function Categories(prop) {

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
        select: (data) => (data.data.data)

    })

    if (isLoading) {
        return <LoadingScreen />

    }
    return (
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10 container'>

            {
                data.map((category, index) => {
                    return <div key={index} className='border rounded-lg transition duration-75 hover:shadow-md hover:scale-[102%]'>
                        <img src={category.image} className='h-72 object-cover w-full rounded ' alt="category" />
                        <h3 className='text-center font-bold py-5 text-[20px] text-purple-900' >{category.name}</h3>
                    </div>
                })

            }
        </div>

    )
}
