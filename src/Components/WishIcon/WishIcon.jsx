import React, { useEffect, useState } from 'react'
import { Button } from '@heroui/react'
import { useContext } from 'react';
import { wishlistContext } from '../../Contexts/WishlistContext';
export const HeartIcon = ({ fill = "red", filled, size, height, width, ...props }) => {
    return (
        <svg
            fill={filled ? fill : "none"}
            height={size || height || 26}
            viewBox="0 0 24 24"
            width={size || width || 26}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export default function WishIcon({ productID }) {
    const [heartColor, setIconColor] = useState("white")
    const { wishlistData, addToWishlist, deleteFromWishlist, wishlistDataID } = useContext(wishlistContext)

    function existInWishlist(productID) {

        return wishlistDataID.find((el) => {
            return (el._id || el) === productID
        })

    }
    useEffect(() => {

        existInWishlist(productID) ? setIconColor("#fb6f92") : setIconColor("white")

    }, [])
    return (
        <Button isIconOnly aria-label="Like" className='bg-slate-300' onPress={() => {

            if (heartColor == "white") {
                addToWishlist(productID)
                setIconColor("#fb6f92")



            }
            else {
                deleteFromWishlist(productID)
                setIconColor("white")




            }


        }}>
            <HeartIcon fill={heartColor} filled />
        </Button>
    )
}
