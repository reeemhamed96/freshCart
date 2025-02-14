import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../Contexts/AuthContext';

export default function ProtectedPasswors({ children }) {

    const { success } = useContext(authContext)


    return (
        <div>
            {success ? children : <Navigate to="/" />}
        </div>
    )
}
