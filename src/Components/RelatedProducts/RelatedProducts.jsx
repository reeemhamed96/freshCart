import React from 'react'
import Product from '../Product/Product'
import Slider from "react-slick";


export default function RelatedProducts({ relatedProduct, setProduct }) {


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,



        responsive: [

            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                },
            }, {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    infinite: false,
                    speed: 500,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: false,
                    speed: 500,
                },
            },

        ]

    };
    return (
        <Slider {...settings} className='pb-24'>
            {
                relatedProduct.map((product, index) => {
                    return <div className='px-5' key={index}><Product product={product} /></div>


                })
            }
        </Slider>
    )
}
