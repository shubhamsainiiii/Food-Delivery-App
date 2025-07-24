import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <FaExclamationTriangle size={72} className="text-red-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </button>
        </div>
    )
}

export default NotFound
