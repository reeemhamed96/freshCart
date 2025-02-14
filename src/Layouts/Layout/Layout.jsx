import React, { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { authContext } from '../../Contexts/AuthContext'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'

export default function Layout() {
    const { isLoad } = useContext(authContext)
    return (<>
        {isLoad ? <LoadingScreen /> :
            <>
                <Navbar />
                <Outlet />
            </>

        }


    </>

    )
}
