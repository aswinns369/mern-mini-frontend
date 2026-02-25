

import AddProduct from './pages/add-products/add-product';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Cart from './pages/cart/cart';
import Home from './Home/home';
import EditProduct from './pages/edit-product/EditProduct';
import MyProducts from './pages/my-products/MyProducts';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import SingleProduct from './pages/single-product/SingleProduct';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/my-products" element={<MyProducts />} />
      </Routes>
    </>
  );
};

export default App;
