import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Discover from '../Components/Discover';
import Stats from '../Components/Stats';
import DishesGrid from '../Components/DishesGrid';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';
import axios from 'axios';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [food, setFood] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [restaurantRes, foodRes] = await Promise.all([
                    axios.get('http://localhost:8080/Restaurant/'),
                    axios.get('http://localhost:8080/food-items/')
                ]);

                console.log(restaurantRes.data, "::::")
                console.log(foodRes.data)

                setRestaurants(restaurantRes.data.data || []);
                setFood(foodRes.data.foodItem || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* <Navbar /> */}
            <Hero />
            <Discover restaurants={restaurants} />
            <Stats />
            <DishesGrid food={food} />
            <FAQ />
            <Footer />
        </div>
    );
};

export default Home;