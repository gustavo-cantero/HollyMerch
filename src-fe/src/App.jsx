import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import SignUpView from "./Views/SignUpView";
import Orders from "./Views/OrdersViews/Order";
import AdminProducts from "./Views/AdminProductsView";
import Profile from "./Views/Profile";
import Cart from "./Views/CartViews/Cart";
import OrdersDetail from "./Views/OrdersViews/OrdersDetail";
import ProductDetailView from "./Views/ProductDetailView";
import EditProduct from "./Views/EditProduct";
import CheckoutForm from "./Views/Checkout/CheckoutForm";
import ChangePasswordView from "./Views/ChangePassword/ChangePasswordView";
import AdminCategories from "./Views/AdminCategories";
import ListPostCard from "./Components/ListPostCard";
import ProductsView from "./Views/ProductsView/ProductsView";
import { ToastContainer } from "react-toastify";
import Home from "./Views/Home/Home";
import LoginView from "./Views/LoginView";
import AdminProductsView from "./Views/AdminProductsView";
import AdminProductView from "./Views/AdminProductView";
import Coupon from "./Components/Coupon/Coupon";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <>
      <Navigation />
      <ToastContainer limit={2} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<SignUpView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductsView />} />
        <Route path="/products/:productId" element={<ProductDetailView />} />
        <Route path="/admin-products" element={<AdminProductsView />} />
        <Route
          path="/admin-products/:productId"
          element={<AdminProductView />}
        />
        {/* <Route path="/orders" element={<Orders />} /> */}
        {/* <Route path="/orders/1" element={<OrdersDetail />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/new-product" element={<EditProduct />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/change-password" element={<ChangePasswordView />} />
        <Route path="/admin-categories" element={<AdminCategories />} />
        <Route path="/admin-cupons" element={<Coupon />} />
        <Route path="/c" element={<ListPostCard />} />
      </Routes>
    </>
  );
}

export default App;
// /product
// /product/detail
