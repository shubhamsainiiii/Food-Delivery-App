import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import notfound from '../assets/notfound.png'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-white text-center py-12 px-4">
            <img
                src={notfound}
                alt="Page not found illustration"
                className="w-full max-w-sm h-auto mb-8"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Oops! That page can't be found.
            </h1>
            <p className="text-gray-500 max-w-lg mb-5">
                The page you are looking for does not exist. You may have mistyped the address or the page may have moved.
            </p>
            <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition duration-300 cursor-pointer"
            >
                Go to Homepage <FaArrowRight />
            </button>
        </div>
    );
};

export default NotFound;
