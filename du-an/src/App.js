import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { setProducts } from './features/product/productSlice'; 
import { Routes, Route } from "react-router-dom";
import Jordan from "./components/Jordan";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Nike from "./components/Nike";
import Adidas from "./components/Adidas";
import Yeezy from "./components/Yeezy";
import OtherBrands from "./components/OtherBrands";
import Sale from "./components/Sale";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Success from "./components/Success";
import LienHe from "./components/LienHe";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { products } from "./components/ProductData.js"; 
import AdminDashboard from "./admin/AdminDashboard";
import ProductManagement from "./admin/ProductManagement";
import UserManagement from "./admin/UserManagement";
import PrivateRoute from "./admin/PrivateRoute";
import YezzyDetail from "./components/YezzyDetail";
import NikeDetail from "./components/NikeDetail";



function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.products);

  // Hàm tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = products;
        dispatch(setProducts(data)); // Cập nhật danh sp vào Redux
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };
  
    if (productList.length === 0) {
      fetchProducts();
    }
  }, [dispatch, productList.length]);

  // Thêm sp vào giỏ hàng
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  // Cập nhật slsp trong giỏ hàng
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Tính tổng slsp trong giỏ hàng
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
  const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
  
    return isLoggedIn ? children : <LoginPage to="/dangnhap" />;
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Navbar onSearch={handleSearch} cart={cart} totalQuantity={totalQuantity} />
          <div className="content">
            {/* Kiểm tra nếu sản phẩm chưa được tải */}
            {productList.length === 0 ? (
              <p>Đang tải sản phẩm...</p>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={<Home searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/about"
                  element={<About searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/nike"
                  element={<Nike searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/adidas"
                  element={<Adidas searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/jordan"
                  element={<Jordan searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/yeezy"
                  element={<Yeezy searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/other-brands"
                  element={<OtherBrands searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route
                  path="/sale"
                  element={<Sale searchQuery={searchQuery} addToCart={addToCart} />}
                />
                <Route path="/checkout" element={<Checkout cart={cart} />} />
                <Route path="/success" element={<Success />} />
                <Route
                  path="/cart"
                  element={<Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} />}
                />
                <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} cart={cart}  />} />
                <Route path="/2product/:id" element={<YezzyDetail products={products} addToCart={addToCart} cart={cart}  />} />
                <Route path="/3product/:id" element={<NikeDetail products={products} addToCart={addToCart} cart={cart}  />} />
                <Route path="/lienhe" element={<LienHe />} />
                <Route path="/dangnhap" element={<LoginPage />} />
                <Route path="/dangky" element={<RegisterPage />} />
                {/* Các route admin cần có quyền truy cập */}
                <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} />} />
                <Route path="/admin/products" element={<PrivateRoute component={ProductManagement} />} />
                <Route path="/admin/users" element={<PrivateRoute component={UserManagement} />} />

              </Routes>
            )}
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
