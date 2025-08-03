import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import scooter from '../assets/scooter.png';

// Category images imports...
import pizza from '../assets/categories/pizza.png';
import chicken from '../assets/categories/chicken.png';
import burger from '../assets/categories/burger.png';
import fries from '../assets/categories/fries.png';
import boritto from '../assets/categories/boritto.png';
import taco from '../assets/categories/taco.png';
import Muffin from '../assets/categories/Muffin.png';
import Coffee from '../assets/categories/Coffee.png';
import Sandwich from '../assets/categories/Sandwich.png';
import Noddle from '../assets/categories/Noddle.png';
import Pasta from '../assets/categories/Pasta.png';
import Meggi from '../assets/categories/Meggi.png';
import Momos from '../assets/categories/Momos.png';
import Salad from '../assets/categories/Salad.png';
import Biryani from '../assets/categories/Biryani.png';
import Meat from '../assets/categories/Meat.png';
import Panner from '../assets/categories/Panner.png';
import Hotdog from '../assets/categories/Hotdog.png';
import Donuts from '../assets/categories/Donuts.png';
import Cupcake from '../assets/categories/Cupcake.png';

const categories = [
    { name: 'Pizza', image: pizza },
    { name: 'Chicken', image: chicken },
    { name: 'Burger', image: burger },
    { name: 'Fries', image: fries },
    { name: 'Boritto', image: boritto },
    { name: 'Sandwich', image: Sandwich },
    { name: 'Noddle', image: Noddle },
    { name: 'Pasta', image: Pasta },
    { name: 'Meggi', image: Meggi },
    { name: 'Momos', image: Momos },
    { name: 'Salad', image: Salad },
    { name: 'Biryani', image: Biryani },
    { name: 'Meat', image: Meat },
    { name: 'Panner', image: Panner },
    { name: 'Hotdog', image: Hotdog },
    { name: 'Donuts', image: Donuts },
    { name: 'Taco', image: taco },
    { name: 'Muffin', image: Muffin },
    { name: 'Cupcake', image: Cupcake },
    { name: 'Coffee', image: Coffee }
];

const Hero = ({ searchTerm, setSearchTerm }) => {
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <section className="relative bg-[#1c1c1c] text-white overflow-hidden">
            <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Discover restaurants and food deliver near you
                    </h1>

                    <div className="flex bg-white rounded-full overflow-hidden w-full max-w-xl">
                        <div className="flex items-center px-4 text-orange-600">
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for Restaurant or Category"
                            className="flex-grow px-4 py-2 text-black outline-none"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button
                            className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2 text-white font-medium"
                            onClick={e => e.preventDefault()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <img src={scooter} alt="scooter" className="w-72 md:w-96 object-contain" />
                </div>
            </div>

            {/* Category Slider */}
            <div className="bg-gradient-to-br from-[#faebd7] to-[#f7fafc] py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <Swiper
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={5}
                        breakpoints={{
                            640: { slidesPerView: 5 },
                            768: { slidesPerView: 6 },
                            1024: { slidesPerView: 8 }
                        }}
                    >
                        {categories.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="flex flex-col items-center justify-center min-w-[80px] p-6 bg-white  rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                                    onClick={() => setSearchTerm(item.name)}
                                >
                                    <img src={item.image} alt={item.name} className="h-14 w-25 object-contain mb-2 " />
                                    <p className="text-black font-medium text-center text-sm">{item.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Hero;
