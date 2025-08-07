import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Discover from "../Components/Discover";
import Stats from "../Components/Stats";
import FoodMenu from "../Components/FoodMenu";
import DishesGrid from "../Components/DishesGrid";

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
            <DishesGrid food={food} searchTerm={searchTerm} />
            {/* <FoodMenu food={food} searchTerm={searchTerm} /> */}
            <Footer />
        </div>
    );
};

export default Home;
