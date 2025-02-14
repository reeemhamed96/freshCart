import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const authContext = createContext()

export default function AuthContextProvider({ children }) {
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoad, setIsLoading] = useState(true)
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [success, setSuccess] = useState(false)


    useEffect(() => {

        if (localStorage.getItem("token")) {
            verifyToken()
        }

        else {
            setIsLoading(false)
        }
    }, [])

    function verifyToken() {
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: {
                token: localStorage.getItem("token")

            }
        }).then((res) => {
            setIsLoggedIn(true)
            setUserId(res.data.decoded.id)
            setUserName(res.data.decoded.name)

        }).catch(() => {
            localStorage.removeItem("token")
            setIsLoggedIn(false)

        }).finally(() => {
            setIsLoading(false)
        })

    }
    window.addEventListener('storage', verifyToken)

    return <authContext.Provider value={{ IsLoggedIn, setIsLoggedIn, success, setSuccess, isLoad, userId, userName }}>{children}</authContext.Provider>

}