import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../App.css'


const Home = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const images = [
        'https://imageio.forbes.com/specials-images/imageserve/61014af0dd6a96c2285f098e/0x0.jpg?format=jpg&crop=2560,1440,x0,y346,safe&height=900&width=1600&fit=bounds',
        'https://img.delicious.com.au/DAsUqhzz/del/2018/05/laucala-island-laucala-fiji-79624-2.jpg',
        // Add more image URLs here
    ]

    useEffect(() => {
        const imgElements = images.map((url) => {
            const img = new Image()
            img.src = url
            return img
        })

        const checkImagesLoaded = () => {
            const allImagesLoaded = imgElements.every((img) => img.complete)
            if (allImagesLoaded) {
                setImagesLoaded(true)
            }
        }

        imgElements.forEach((img) => {
            img.onload = checkImagesLoaded
            img.onerror = checkImagesLoaded
        })

        checkImagesLoaded()
    }, [images])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        centerPadding: '0',
    }

    return (
        <div className="pt-28 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden w-full">
            {imagesLoaded ? (
                <div className="max-w-3xl mb-8">
                    <Slider {...settings}>
                        {images.map((url, index) => (
                            <div key={index} className="flex justify-center">
                                <img
                                    src={url}
                                    alt={`Pool ${index + 1}`}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <p>Loading carousel...</p>
            )}
            <div className="text-center max-w-xl bg-white p-6 rounded-lg shadow-md mb-8">
                <h1 className="text-4xl font-bold mb-4 text-primary">
                    Welcome to PoolBoys
                </h1>
                <p className="text-lg mb-8 text-gray-700">
                    You could make $10k a summer with PoolBoys. 10,000 customers
                    have used us and they agree too.
                </p>
            </div>
        </div>
    )
}

export default Home