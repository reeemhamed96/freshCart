import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext'
import Login from '../Pages/Login/Login'

export default function ProtectedRoute({ children }) {
    const { IsLoggedIn } = useContext(authContext)

    return (
        <div>

            {IsLoggedIn ? children : <Login />}
        </div>
    )
}
