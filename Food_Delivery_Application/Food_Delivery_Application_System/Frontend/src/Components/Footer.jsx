import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-3 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-4">
                <div>
                    <h2 className="font-bold text-lg mb-4">ORDERIT</h2>
                    <p>We offer flexible delivery...</p>
                    <p>So Dishkart Karo</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Know More</h3>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <Link to="/" className="hover:text-orange-600 transition-all duration-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-orange-600 transition-all duration-300">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu" className="hover:text-orange-600 transition-all duration-300">
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link to="/category" className="hover:text-orange-600 transition-all duration-300">
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link to="/restaurants" className="hover:text-orange-600 transition-all duration-300">
                                Restaurants
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-orange-600 transition-all duration-300">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="hover:text-orange-600 transition-all duration-300">
                                FAQs
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Follow Us</h3>
                    <ul className="flex flex-col space-y-2">
                        <li><a href="#" className="hover:text-orange-600">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-orange-600">Facebook</a></li>
                        <li><a href="#" className="hover:text-orange-600">Instagram</a></li>
                        <li><a href="#" className="hover:text-orange-600">Twitter</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Contact Us</h3>
                    <p>dishkart@info.com</p>
                    <p>+91-7691888950</p>
                </div>
            </div>

            <div className="text-center text-gray-500 mt-2">
                &copy; {new Date().getFullYear()} Dishkart - All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
