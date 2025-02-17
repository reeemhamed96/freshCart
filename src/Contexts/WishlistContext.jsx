import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
export const wishlistContext = createContext()

export default function WishlistContextProvider({ children }) {
    const [wishlistData, setWishlistData] = useState([])
    const [wishlistDataID, setWishlistDataID] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getUserWishlist()

    }, [])


    function getUserWishlist() {
        setIsLoading(true)
        axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: localStorage.getItem("token")

            }
        }).then(({ data }) => {
            // console.log(data);

            setWishlistData(data.data.reverse())
            setWishlistDataID(data.data)




        }).catch((err) => {
            console.log(err);



        }).finally(() => {
            setIsLoading(false)
        })

    }

    function deleteFromWishlist(productId) {

        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setWishlistDataID(data.data)



            toast('Product removed successfully from Wishlist ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        })




    }


    function addToWishlist(productId) {


        axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
            productId

        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setWishlistDataID(data.data)

            toast('Product added successfully to Wishlist ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        })




    }





    return <wishlistContext.Provider value={{ wishlistData, setWishlistData, deleteFromWishlist, addToWishlist, isLoading, setIsLoading, getUserWishlist, wishlistDataID }}>{children}</wishlistContext.Provider>

}