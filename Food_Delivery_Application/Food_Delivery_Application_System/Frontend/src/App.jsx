// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import RestaurantDashboard from './Restaurant/RestaurantDashboard';
// import AdminDashboard from './Admin/AdminDashboard';
// import DeliveryBoyDashboard from './DeliveryBoy/DeliveryBoyDashboard';
// import UserDashboard from './User/UserDashboard';
// import Login from './Auth/Login';
// import Signup from './Auth/Signup';
// import SignupDeliveryBoy from './Auth/SignupDeliveryBoy';
// import SignupRestaurantOwner from './Auth/SignupRestaurantOwner';
// import ForgotPassword from './Auth/VerifyEmail';
// import OtpVerify from './Auth/OtpVerify';
// import ResetPassword from './Auth/ResetPassword';
// import AddFood from './Restaurant/AddFood';
// import NotFound from './Components/NotFound';
// import Restaurantupdate from './Restaurant/Restaurantupdate';
// import Home from './Pages/Home';
// import VerifyEmail from './Auth/VerifyEmail';
// import UserAddressAdd from './User/UserAddress';
// import UserAddress from './User/UserAddress';
// import UserProfile from './User/UserProfile';
// import UserOrder from './User/UserOrder';
// import CreateAddress from './User/CreateAddress';
// import Cartpage from './Pages/Cartpage';


// function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-center" autoClose={2000} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/rd" element={<RestaurantDashboard />} />
//         <Route path="/rdup" element={<Restaurantupdate />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/delivery-dashboard" element={<DeliveryBoyDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signupdeliveryboy" element={<SignupDeliveryBoy />} />
//         <Route path="/signuprestaurantowner" element={<SignupRestaurantOwner />} />
//         <Route path="/verifyemail" element={<VerifyEmail />} />
//         <Route path="/otp" element={<OtpVerify />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/add-food" element={<AddFood />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/cart" element={<Cartpage />} />



//         {/* user routing */}
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//         <Route path="/user/profile" element={<UserProfile />} />
//         <Route path="/user/addresses" element={<UserAddress />} />
//         <Route path="/user/createaddress" element={<CreateAddress />} />
//         <Route path="/user/orders" element={<UserOrder />} />


//       </Routes>
//     </Router>
//   );
// }

// export default App;





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
import ForgotPassword from './Auth/VerifyEmail';
import OtpVerify from './Auth/OtpVerify';
import ResetPassword from './Auth/ResetPassword';
import AddFood from './Restaurant/AddFood';
import NotFound from './Components/NotFound';
import Restaurantupdate from './Restaurant/Restaurantupdate';
import Home from './Pages/Home';
import VerifyEmail from './Auth/VerifyEmail';
import UserAddressAdd from './User/UserAddress';
import UserAddress from './User/UserAddress';
import UserProfile from './User/UserProfile';
import UserOrder from './User/UserOrder';
import CreateAddress from './User/CreateAddress';
import Cartpage from './Pages/Cartpage';
import ProtectedRoute from './ProtectedRoute';
import MenuPage from './Pages/MenuPage';
import Navbar from './Components/Navbar';



function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupdeliveryboy" element={<SignupDeliveryBoy />} />
        <Route path="/signuprestaurantowner" element={<SignupRestaurantOwner />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/menu" element={<MenuPage />} />

        {/* Admin Protected */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Restaurant Protected */}
        <Route
          path="/rd"
          element={
            <ProtectedRoute allowedRoles={['restaurant']}>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rdup"
          element={
            <ProtectedRoute allowedRoles={['restaurant']}>
              <Restaurantupdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-food"
          element={
            <ProtectedRoute allowedRoles={['restaurant']}>
              <AddFood />
            </ProtectedRoute>
          }
        />

        {/* Delivery Boy Protected */}
        <Route
          path="/delivery-dashboard"
          element={
            <ProtectedRoute allowedRoles={['delivery-boy']}>
              <DeliveryBoyDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Protected */}
        <Route
          path="/user/userdashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/addresses"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserAddress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/createaddress"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CreateAddress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
