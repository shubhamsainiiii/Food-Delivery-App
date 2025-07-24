// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import Login from './Components/Login';
// import SignupDeliveryBoy from './Components/SignupDeliveryBoy';
// import SignupRestaurantOwner from './Components/SignupRestaurantOwner';
// import ForgotPassword from './Components/ForgotPassword';
// import OtpVerify from './Components/OtpVerify';
// import ResetPassword from './Components/ResetPassword';
// import Signup from './Components/Signup';
// import RestaurantDashboard from './Components/RestaurantDashboard';


// function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-center" autoClose={2000} />
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/rd" element={<RestaurantDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signupdeliveryboy" element={<SignupDeliveryBoy />} />
//         <Route path="/signuprestaurantowner" element={<SignupRestaurantOwner />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/otp" element={<OtpVerify />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Login from './Components/Login';
import SignupDeliveryBoy from './Components/SignupDeliveryBoy';
import SignupRestaurantOwner from './Components/SignupRestaurantOwner';
import ForgotPassword from './Components/ForgotPassword';
import OtpVerify from './Components/OtpVerify';
import ResetPassword from './Components/ResetPassword';
import Signup from './Components/Signup';
import RestaurantDashboard from './Components/RestaurantDashboard';
import AdminDashboard from './Components/AdminDashboard';
import DeliveryBoyDashboard from './Components/DeliveryBoyDashboard';
import UserDashboard from './Components/UserDashboard';
import NotFound from './Components/NotFound';
import AddFood from './Components/AddFood';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/rd" element={<RestaurantDashboard />} />
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
