import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';

export default function Login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { setIsLoggedIn } = useContext(authContext)
    const initialValues = {
        email: '',
        password: '',


    }
    const onSubmit = () => {
        setErrMsg("")
        setIsLoading(true)
        // console.log(values);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((res) => {
            // console.log(res);

            localStorage.setItem("token", res.data.token)
            setIsLoggedIn(true)
            navigate(location.pathname == "/login" ? "/" : location.pathname)


        }).catch((err) => {
            setErrMsg(err.response.data.message)
            console.log(err);
        }).finally(() => {
            setIsLoading(false)

        })



    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number"),

    })
    const { values, handleSubmit, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,


    });

    // console.log(errors);
    // console.log(touched);
    return (
        <div className='my-10'>
            <h2 className='text-center mb-5 font-manrope font-bold text-3xl leading-10 text-black '>Login</h2>
            <form onSubmit={handleSubmit
                // (e) => {
                // e.preventDefault()
                // console.log("Hi");}

            }>
                <div className='grid gap-4 mx-auto w-2/3 grid-cols-2'>

                    <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' variant='bordered' className='col-span-2' label="Email" type='email'></Input>
                    {/* {touched.email && errors.email && <p>{errors.email}</p>} */}
                    <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' variant='bordered' className='col-span-2' label="Password" type='password'></Input>
                    {/* {touched.password && errors.password && <p>{errors.password}</p>} */}

                    <Button isLoading={isLoading} className='col-span-2' color="primary" type='submit'>Login</Button>
                    <p className='text-red-500'>{errMsg}</p>

                    <Link to="/forgetpassword" className='col-span-2 hover:text-indigo-700'>Forget Password ?</Link>

                </div>


            </form>


        </div>

    )
}



