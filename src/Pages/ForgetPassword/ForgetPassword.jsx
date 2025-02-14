import React, { useContext, useState } from 'react'
import { Button, Input } from '@heroui/react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';






export default function ForgetPassword() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { setSuccess } = useContext(authContext)


    const initialValues = {
        email: '',

    }
    const checkEmailexist = () => {
        setErrMsg("")
        setIsLoading(true)
        // console.log(values);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(({ data }) => {
            console.log(data.statusMsg);
            setSuccess(true)
            navigate("/verify-code")


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


        })


    });
    return (
        <div className='container pt-10'>
            <h2 className='text-center mb-5 font-manrope font-bold text-3xl leading-10 text-black '>Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-4 mx-auto w-2/3 grid-cols-2'>
                    <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' className='col-span-2' label="Email" type='email'></Input>
                    <Button isLoading={isLoading} className='col-span-2' color="primary" type='submit'>Send</Button>
                    <p className='text-red-500'>{errMsg}</p>
                </div>

            </form>
        </div>
    )
}
