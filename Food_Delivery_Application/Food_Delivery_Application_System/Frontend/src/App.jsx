import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import OtpVerify from './Auth/OtpVerify';
import ResetPassword from './Auth/ResetPassword';
import AddFood from './Restaurant/AddFood';
import NotFound from './Components/NotFound';
import Restaurantupdate from './Restaurant/Restaurantupdate';
import Home from './Pages/Home';
import VerifyEmail from './Auth/VerifyEmail';
import UserAddress from './User/UserAddress';
import UserProfile from './User/UserProfile';
import UserOrder from './User/UserOrder';
import CreateAddress from './User/CreateAddress';
import MenuPage from './Pages/MenuPage';
import RestaurantPage from './Pages/RestaurantPage';
import AvailableDish from './Restaurant/AvailableDish';
import RecentOrders from './Restaurant/RecentOrders';
import AllDishes from './Restaurant/AllDishes';
import EditDishes from './Restaurant/EditDishes';
import HandleRestaurant from './Admin/HandleRestaurant';
import HandleDeliveryBoy from './Admin/HandleDeliveryBoy';
import FAQ from './Components/FAQ';
import Cartpage from './Pages/Cartpage';
import Navbar from './Components/Navbar';
import WelcomePage from './Pages/WelComePage';
import ProtectedRoute from './ProtectedRoute';
import UserCheckout from './User/UserCheckout';
import FoodDetailsPage from './Pages/FoodDetailsPage';
import UserOrderHistory from './User/UserOrderHistory';
import UserOrderDetail from './User/UserOrderDetail';
import RestaurantDetails from './Admin/RestaurantDetails';
import DeliveryBoyDetails from './Admin/DeliveryBoyDetails';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      {!['/', '/login', '/signup', '/signupdeliveryboy', '/signuprestaurantowner', '/otp', '/verifyemail', '/reset-password'].includes(location.pathname) && <Navbar />}


      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signupdeliveryboy" element={<SignupDeliveryBoy />} />
        <Route path="/signuprestaurantowner" element={<SignupRestaurantOwner />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/food/:id" element={<FoodDetailsPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/deliveryboy" element={<ProtectedRoute allowedRoles={['admin']}><HandleDeliveryBoy /></ProtectedRoute>} />
        <Route path="/admin/restaurants" element={<ProtectedRoute allowedRoles={['admin']}><HandleRestaurant /></ProtectedRoute>} />
        <Route path="/admin/restaurantdetail/:id" element={<ProtectedRoute allowedRoles={['admin']}><RestaurantDetails /> </ProtectedRoute>} />
        <Route path="/admin/deliveryboydetail/:id" element={<ProtectedRoute allowedRoles={['admin']}><DeliveryBoyDetails /> </ProtectedRoute>} />


        {/* Restaurant Routes */}
        <Route path="/restaurant/dashboard" element={<ProtectedRoute allowedRoles={['restaurant']}><RestaurantDashboard /></ProtectedRoute>} />
        <Route path="/restaurant/availabledish" element={<ProtectedRoute allowedRoles={['restaurant']}><AvailableDish /></ProtectedRoute>} />
        <Route path="/restaurant/orders" element={<ProtectedRoute allowedRoles={['restaurant']}><RecentOrders /></ProtectedRoute>} />
        <Route path="/restaurant/dishes" element={<ProtectedRoute allowedRoles={['restaurant']}><AllDishes /></ProtectedRoute>} />
        <Route path="/restaurant/editdish/:id" element={<ProtectedRoute allowedRoles={['restaurant']}><EditDishes /></ProtectedRoute>} />
        <Route path="/rdup" element={<ProtectedRoute allowedRoles={['restaurant']}><Restaurantupdate /></ProtectedRoute>} />
        <Route path="/add-food" element={<ProtectedRoute allowedRoles={['restaurant']}><AddFood /></ProtectedRoute>} />

        {/* Delivery Boy Routes */}
        <Route path="/deliveryboy/dashboard" element={<ProtectedRoute allowedRoles={['delivery-boy']}><DeliveryBoyDashboard /></ProtectedRoute>} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/profile" element={<ProtectedRoute allowedRoles={['user']}><UserProfile /></ProtectedRoute>} />
        <Route path="/user/addresses" element={<ProtectedRoute allowedRoles={['user']}><UserAddress /></ProtectedRoute>} />
        <Route path="/user/createaddress" element={<ProtectedRoute allowedRoles={['user']}><CreateAddress /></ProtectedRoute>} />
        <Route path="/user/orders" element={<ProtectedRoute allowedRoles={['user']}><UserOrder /></ProtectedRoute>} />
        <Route path="/user/checkout" element={<ProtectedRoute allowedRoles={['user']}><UserCheckout /> </ProtectedRoute>} />
        <Route path="/user/orderhistory" element={<ProtectedRoute allowedRoles={['user']}><UserOrderHistory /> </ProtectedRoute>} />
        <Route path="/user/orderdetails/:invoiceId" element={<ProtectedRoute allowedRoles={['user']}><UserOrderDetail /> </ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
