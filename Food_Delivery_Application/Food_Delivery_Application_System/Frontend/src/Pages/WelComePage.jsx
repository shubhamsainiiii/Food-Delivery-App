import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bg from '../assets/bg.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';

const WelcomePage = () => {
    const navigate = useNavigate();
    const slides = [
        {
            img: bg,
            heading: 'Order food. Discover best restaurants.',
            subheading: 'We deliver your favorite meals from top-rated restaurants at lightning speed.',
            buttonLabel: 'Explore Food & Restaurants',
            link: '/home',
        },
        {
            img: bg2,
            heading: 'Fresh, Fast & Delicious.',
            subheading: 'Browse dishes, choose your meal, and we’ll take care of the rest.',
            buttonLabel: 'Start Your Order Now',
            link: '/home',
        },
        {
            img: bg3,
            heading: 'Your Favorite Dishes, Just a Cart Away',
            subheading: 'Crave it. Click it. Enjoy it. We bring deliciousness right to your door.',
            buttonLabel: 'Order Now',
            link: '/home',
        },
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <Slider {...sliderSettings} className="w-full h-full">
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-screen relative">
                        {/* Slide background */}
                        <img
                            src={slide.img}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-screen object-cover"
                        />

                        {/* Overlay content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/60 px-4 text-center">
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                                {slide.heading} <br />
                                <span className="text-orange-400">DishKart!</span>
                            </h1>
                            <p className="text-base md:text-lg mb-6 max-w-2xl">
                                {slide.subheading}
                            </p>
                            <button
                                onClick={() => navigate(slide.link)}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-base md:text-lg px-6 py-3 rounded-full hover:scale-103 shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                {slide.buttonLabel} <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default WelcomePage;
