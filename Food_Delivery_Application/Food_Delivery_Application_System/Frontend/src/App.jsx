import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RestaurantDashboard from './Restaurant/RestaurantDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import DeliveryBoyDashboard from './DeliveryBoy/DeliveryBoyDashboard';
import UserDashboard from './User/UserDashboard';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import SignupDeliveryBoy from './Auth/SignupDeliveryBoy';
import SignupRestaurantOwner from './Auth/SignupRestaurantOwner';
import ForgotPassword from './Auth/ForgotPassword';
import OtpVerify from './Auth/OtpVerify';
import ResetPassword from './Auth/ResetPassword';
import AddFood from './Restaurant/AddFood';
import NotFound from './Components/NotFound';
import Restaurantupdate from './Restaurant/Restaurantupdate';
import Home from './Pages/Home';


function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rd" element={<RestaurantDashboard />} />
        <Route path="/rdup" element={<Restaurantupdate />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/delivery-dashboard" element={<DeliveryBoyDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupdeliveryboy" element={<SignupDeliveryBoy />} />
        <Route path="/signuprestaurantowner" element={<SignupRestaurantOwner />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/add-food" element={<AddFood />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
