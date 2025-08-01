// src/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user')); // example, adjust if using context/state

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        if (user.role === 'Admin') return <Navigate to="/admin-dashboard" replace />;
        if (user.role === 'User') return <Navigate to="/user-dashboard" replace />;
        if (user.role === 'Restaurant') return <Navigate to="/rd" replace />;
        if (user.role === 'delivery-boy') return <Navigate to="/delivery-dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
