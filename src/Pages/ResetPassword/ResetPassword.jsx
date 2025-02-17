import React, { useContext, useState } from 'react'
import { Button, Input } from '@heroui/react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import { authContext } from '../../Contexts/AuthContext';
export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { setSuccess, setUpdatePass } = useContext(authContext)

    const initialValues = {
        email: '',
        newPassword: ''

    }

    const checkEmailexist = () => {
        setErrMsg("")
        setIsLoading(true)

        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values).then((res) => {
            setSuccess(false)
            setUpdatePass(true)


        }).catch((err) => {
            setErrMsg(err.response.data.message)
            console.log(err);
        }).finally(() => {
            setIsLoading(false)

        })



    }
    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues,
        onSubmit: checkEmailexist,
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required").email(),
            newPassword: Yup.string().required("New Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number"),


        })


    });
    return (
        <div className='pt-10 container'>
            <h2 className='text-center mb-5 font-manrope font-bold text-3xl leading-10 text-black '>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-4 mx-auto w-2/3 grid-cols-2'>
                    <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' className='col-span-2' label="Email" type='email'></Input>
                    <Input isInvalid={touched.newPassword && errors.newPassword} errorMessage={errors.newPassword} onBlur={handleBlur} onChange={handleChange} value={values.newPassword} name='newPassword' variant='bordered' className='col-span-2' label="New Password" type='password'></Input>
                    <Button isLoading={isLoading} className='col-span-2' color="primary" type='submit'>Reset</Button>
                    <p className='text-red-500'>{errMsg}</p>
                </div>

            </form>
        </div>
    )
}

