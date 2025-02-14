import React, { useState } from 'react'
import { Button, Input } from '@heroui/react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate()
    const initialValues = {
        resetCode: '',

    }

    const verifycode = () => {
        setErrMsg("")
        setIsLoading(true)
        // console.log(values);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then((res) => {
            // console.log(res);


            navigate("/reset-password")


        }).catch((err) => {
            setErrMsg(err.response.data.message)
            console.log(err);
        }).finally(() => {
            setIsLoading(false)

        })



    }
    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues,
        onSubmit: verifycode,
        validationSchema: Yup.object({
            resetCode: Yup.string().required("Code is required").min(3).max(6),


        })


    });
    return (
        <div className='pt-10 container'>
            <h2 className='text-center mb-5 font-manrope font-bold text-3xl leading-10 text-black '> Verify Code</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-4 mx-auto w-2/3 grid-cols-2'>
                    <Input isInvalid={touched.resetCode && errors.resetCode} errorMessage={errors.resetCode} onBlur={handleBlur} onChange={handleChange} value={values.email} name='resetCode' variant='bordered' className='col-span-2' label="Code" type='text'></Input>
                    <Button isLoading={isLoading} className='col-span-2' color="primary" type='submit'>Verify</Button>
                    <p className='text-red-500'>{errMsg}</p>
                </div>

            </form>
        </div>
    )
}


