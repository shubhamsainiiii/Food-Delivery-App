// import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/Navbar';
// import Hero from '../Components/Hero';
// import Discover from '../Components/Discover';
// import Stats from '../Components/Stats';
// import DishesGrid from '../Components/DishesGrid';
// import FAQ from '../Components/FAQ';
// import Footer from '../Components/Footer';
// import axios from 'axios';

// const Home = () => {
//     const [restaurants, setRestaurants] = useState([]);
//     const [food, setFood] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [restaurantRes, foodRes] = await Promise.all([
//                     axios.get('http://localhost:8080/Restaurant/'),
//                     axios.get('http://localhost:8080/food-items/')
//                 ]);

//                 console.log(restaurantRes.data, "::::")
//                 console.log(foodRes.data)

//                 setRestaurants(restaurantRes.data.data || []);
//                 setFood(foodRes.data.foodItem || []);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className='mt-25'>
//             <Hero />
//             <Discover restaurants={restaurants} />
//             <Stats />
//             <DishesGrid food={food} />
//             <Footer />
//         </div>
//     );
// };

// export default Home;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Discover from "../Components/Discover";
import Stats from "../Components/Stats";
import FoodMenu from "../Components/FoodMenu";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [food, setFood] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [restaurantRes, foodRes] = await Promise.all([
                    axios.get('http://localhost:8080/Restaurant/'),
                    axios.get('http://localhost:8080/food-items/')
                ]);

                const restaurantsData = restaurantRes.data.data || [];
                const foodData = foodRes.data.foodItem || [];

                // enrich food with restaurantName
                const enrichedFood = foodData.map(item => {
                    const restaurant = restaurantsData.find(r => r._id === item.restaurantId);
                    return {
                        ...item,
                        restaurantName: restaurant?.restaurantName || ""
                    };
                });

                setRestaurants(restaurantsData);
                setFood(enrichedFood);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-25'>
            <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Discover restaurants={restaurants} searchTerm={searchTerm} />
            <Stats />
            <FoodMenu food={food} searchTerm={searchTerm} />
            <Footer />
        </div>
    );
};

export default Home;
