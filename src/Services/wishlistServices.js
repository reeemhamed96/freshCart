import axios from "axios";
import { Bounce, toast } from "react-toastify";



export async function addToWishlist(productId) {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
        productId

    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
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
    });

}
export async function deleteFromWishlist(productId) {
    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
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

}



