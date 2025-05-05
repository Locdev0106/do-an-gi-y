import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Dùng để lấy và cập nhật trạng thái từ Redux
import { logout } from "../features/auth/authSlice"; // Import action logout từ Redux slice
import "./Navbar.css";

function Navbar({ onSearch, cart, totalQuantity }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  // Lấy trạng thái người dùng từ Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchInput);
    } else {
      console.log("Tìm kiếm:", searchInput);
    }
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout()); // Gọi action logout để xóa trạng thái đăng nhập
    navigate("/"); // Điều hướng về trang chủ
  };

  const goToCart = () => {
    navigate("/cart"); // Điều hướng đến trang giỏ hàng
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleMenuClick("/")}>
        <div className="logo-img">
          <img src="/images/logo8.png" alt="Logo" />
        </div>
      </div>
      <ul className="menu">
        <li onClick={() => handleMenuClick("/about")}>GIỚI THIỆU</li>
        <li onClick={() => handleMenuClick("/nike")}>NIKE</li>
        <li onClick={() => handleMenuClick("/adidas")}>ADIDAS</li>
        <li onClick={() => handleMenuClick("/jordan")}>JORDAN</li>
        <li onClick={() => handleMenuClick("/yeezy")}>YEEZY</li>
        <li onClick={() => handleMenuClick("/other-brands")}>OTHER BRANDS</li>
        <li onClick={() => handleMenuClick("/sale")}>SALE</li>
        <li onClick={() => handleMenuClick("/lienhe")}>GÓP Ý</li>
        
        
        {!isLoggedIn ? (
          <>
            <li onClick={() => handleMenuClick("/dangnhap")}>ĐĂNG NHẬP</li>
            <li onClick={() => handleMenuClick("/dangky")}>ĐĂNG KÝ</li>
          </>
        ) : (
          <>
            <li>Xin chào, {user?.name || "User"}</li> {/* Hiển thị tên người dùng */}
            <li onClick={handleLogout}>ĐĂNG XUẤT</li>
          </>
        )}
      </ul>
      <div className="search-cart">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Nhập từ cần tìm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <span className="search-icon" onClick={handleSearch}>
            🔍
          </span>
        </div>
        <div className="cart-wrapper">
          <button className="cart-button" onClick={goToCart}>
            🛒
            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
