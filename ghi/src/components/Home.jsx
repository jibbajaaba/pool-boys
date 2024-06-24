import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../App.css'


const Home = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const images = [
        'https://media.cntraveller.com/photos/646b250470a21205c2817f04/master/w_2580%2Cc_limit/Amanruya%2C%2520Turkey%2520-%2520Main%2520Swimming%2520Pool_27493-may23-pr.jpeg',
        'https://media.cntraveller.com/photos/63e4e2250b3ae3affb02f633/master/w_2580%2Cc_limit/DC_Villa_19-spa-feb%252023-pr-global.jpg',
        'https://media.cntraveller.com/photos/642417da2f39eb0cd7d373fe/master/w_2580%2Cc_limit/marrakech-resort-overview4-MO-Marrakech-mar23-pr.jpg',
        'https://media.cntraveller.com/photos/611bebf322be3ca7e5c009eb/master/w_2580%2Cc_limit/shangri-la-hotel-at-the-shard-london-sky-pool-london-nov19-pr.jpg',
        'https://media.cntraveller.com/photos/665da8e290360c3b8f04857a/master/w_2580%2Cc_limit/13%2520-%2520Water%2520On%2520%2520Water%2520Pool%2520and%2520T%2520Beach-Grand%2520Hotel%2520Tremezzo-may24-pr.jpeg',
        'https://media.cntraveller.com/photos/611be9a16ab96bf3ecf1ef41/master/w_2580%2Cc_limit/infinity_pool_miramontiboutiquehotel_southtyrol_italy-miramonti-jan20-pr.jpg',
        'https://media.cntraveller.com/photos/611bebf0f902cc2d167b4145/master/w_2580%2Cc_limit/Marina-Bay-Sands-2-Traveller-9Jul13-PR_b.jpg',
        'https://media.cntraveller.com/photos/611bebe9628f4910ed102143/master/w_2580%2Cc_limit/joali-maldives-dec18-pr1.jpg',
        'https://media.cntraveller.com/photos/611bebecc15cf5da489ecd71/master/w_2580%2Cc_limit/Laucala-Fiji-pool-conde-nast-traveller-30may14-pr.jpg',
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
