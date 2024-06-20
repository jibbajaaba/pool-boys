import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
import '../carousel.css';

const Home = () => {
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
    };

    const images = [
        'https://i.ytimg.com/vi/TOm4NiBlUrI/maxresdefault.jpg',
        'https://img.delicious.com.au/DAsUqhzz/del/2018/05/laucala-island-laucala-fiji-79624-2.jpg',
        // Add more image URLs here
    ];

    return (
        <div className="pt-28 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden w-full">
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
    );
};

export default Home;
