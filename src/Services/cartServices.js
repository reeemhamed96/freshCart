import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function addToCart(productId) {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId

    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })

    toast('Product added successfully to Cart ', {
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

