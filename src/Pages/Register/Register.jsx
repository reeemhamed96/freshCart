import { Button, Input, useSnippet } from '@heroui/react'
import { div } from 'framer-motion/client'
import React, { useState } from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '+20',

    }
    const onSubmit = () => {
        setErrMsg("")
        setIsLoading(true)
        console.log(values);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((res) => {
            console.log(res);
            navigate("/login")
        }).catch((err) => {
            console.log(err.response.data.message);
            setErrMsg(err.response.data.message)
        }).finally(() => {
            setIsLoading(false)

        })



    }
    // const validate = () => {
    //     const errors = {}

    //     if (values.name === "") {
    //         errors.name = "Name is required"

    //     } else if (values.name < 3) {
    //         errors.name = "Min length is 3 characters"

    //     }
    //     if (values.email === "") {
    //         errors.email = "Email is required"

    //     }
    //     if (values.password === "") {
    //         errors.password = "Password is required"

    //     }
    //     if (values.rePassword === "") {
    //         errors.rePassword = "Repassword is required"

    //     }
    //     if (values.phone === "") {
    //         errors.phone = "Phone is required"

    //     }

    //     return errors
    // }
    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").min(3).max(20),
            email: Yup.string().email().required("Email is required"),
            password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number"),
            rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref("password")], "Error"),
            phone: Yup.string().required("Phone is required").min(11)
        })
        // validate,

    });

    // console.log(errors);
    // console.log(touched);
    return (
        <div className='my-10'>
            <h2 className='text-center mb-5 font-manrope font-bold text-3xl leading-10 text-black '>Resister</h2>
            <form onSubmit={handleSubmit
                // (e) => {
                // e.preventDefault()
                // console.log("Hi");}

            }>
                <div className='grid gap-4 mx-auto w-2/3 grid-cols-2'>

                    <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' variant='bordered' className='col-span-2' label="Name" type='name'></Input>
                    {/* {touched.name && errors.name && <p>{errors.name}</p>} */}
                    <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' className='col-span-2' label="Email" type='email'></Input>
                    {/* {touched.email && errors.email && <p>{errors.email}</p>} */}
                    <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant='bordered' className='col-span-1' label="Password" type='password'></Input>
                    {/* {touched.password && errors.password && <p>{errors.password}</p>} */}
                    <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} onBlur={handleBlur} onChange={handleChange} value={values.rePassword} name='rePassword' variant='bordered' className='col-span-1' label="rePassword" type='password'></Input>
                    {/* {touched.rePassword && errors.rePassword && <p>{errors.rePassword}</p>} */}
                    <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant='bordered' className='col-span-2' label="phone" type='tel'></Input>
                    {/* {touched.phone && errors.phone && <p>{errors.phone}</p>} */}
                    <Button isLoading={isLoading} className='col-span-2' color="primary" type='submit'>Register</Button>
                    <p className='text-red-500'>{errMsg}</p>

                </div></form>
        </div>

    )
}
