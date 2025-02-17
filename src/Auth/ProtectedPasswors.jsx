import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../Contexts/AuthContext';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';

export default function ProtectedPasswors({ children }) {

    const { success, updatePass } = useContext(authContext)

    if (updatePass) {
        return <ResetPassword />
    }


    return (
        <div>
            {success ? children : <Navigate to="/" />}
        </div>
    )
}
