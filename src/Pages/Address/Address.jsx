import { Button, Input, form } from '@heroui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from "yup"

export default function Address() {
    const { cartId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const initialValues = {
        details: "",
        phone: '+20',
        city: ""

    }

    function checkout() {
        setErrMsg("")
        setIsLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
            "shippingAddress": values
        }, {
            headers: {
                token: localStorage.getItem("token")
            }, params: {
                url: "https://reeemhamed96.github.io/freshCart"

            }
        }).then(({ data }) => {
            console.log(data.session.url);
            location.href = data.session.url

        }).catch((err) => {
            console.log(err.response.data.message);
            setErrMsg(err.response.data.message)
        }).finally(() => {
            setIsLoading(false)

        })
    }


    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues,
        onSubmit: checkout,
        validationSchema: Yup.object({
            details: Yup.string().required("Address is required").min(3).max(70),
            phone: Yup.string().required("Phone is required").min(11),
            city: Yup.string().required("City is required").min(3)

        })


    });

    return (
        <div className='container pt-9'>
            <h2 className='text-center mb-5 font-manrope font-bold text-3xl leading-10 text-black '>Shipping Address</h2>

            <form onSubmit={handleSubmit}>
                <div className='grid gap-4 mx-auto w-2/3 grid-cols-2'>

                    <Input isInvalid={touched.details && errors.details} errorMessage={errors.details} onBlur={handleBlur} onChange={handleChange} value={values.address} name='details' variant='bordered' className='col-span-2' label="Address" type='text'></Input>

                    <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant='bordered' className='col-span-2' label="Phone" type='phone'></Input>

                    <Input isInvalid={touched.city && errors.city} errorMessage={errors.city} onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' variant='bordered' className='col-span-2' label="City" type='text'></Input>
                    <Button isLoading={isLoading} className='col-span-2' color="primary" type='submit'>Pay Now</Button>
                    <p className='text-red-500'>{errMsg}</p>

                </div>

            </form>
        </div>
    )
}
