import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { login } from "../features/auth/authSlice"; 
import { useNavigate } from "react-router-dom"; 
import "./LoginPage.css";


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));

    if (isLoggedIn && isAdmin) {
      alert("Đăng nhập thành công với quyền admin!");
      navigate("/admin-dashboard");
    } else if (isLoggedIn) {
      alert("Đăng nhập thành công với quyền người dùng.");
      navigate("/");
    } else {
      setError("Thông tin đăng nhập không chính xác.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/images/logo8.png" alt="Logo" />
        </div>
        <h2>Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">ĐĂNG NHẬP</button>
        </form>
        <div className="options">
          <a href="/forgot-password">Quên mật khẩu?</a>
          <span>HOẶC</span>
        </div>
        <p>Bạn mới biết đến KingShoes? <a href="/dangky">Đăng ký</a></p>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span role="img" aria-label="email">📧</span>
              <span style={{ fontWeight: "bold" }}>ĐĂNG KÝ NHẬN PHIẾU GIẢM GIÁ</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="email"
                placeholder="Địa chỉ mail của bạn"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #1ABC9C",
                  width: "250px",
                  outline: "none",
                }}
              />
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1ABC9C",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#148F77")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1ABC9C")}
              >
                ĐĂNG KÝ
              </button>
            </div>
            <div>
              <span style={{ color: "#1ABC9C", fontWeight: "bold" }}>
                Nhận Ngay VOUCHER 100k cho 500 khách hàng đầu tiên
              </span>
            </div>
          </div>
        </div>
        
        <div className="footer-links">
          <div>
            <img
              src="./images/QRN.jpg"
              alt="Logo King Shoes"
              style={{ marginBottom: "15px", width: "100px", borderRadius: "50%" }}
            />
            <h3 style={{ margin: "10px 0", color: "#1ABC9C" }}>THÔNG TIN LIÊN HỆ</h3>
            <p>Số ĐKKD: 41N8041309 cấp ngày 17/8/2018</p>
            <p>Nơi cấp: UBND PHƯỜNG VĨNH ĐIỆN</p>
            <p>Hộ Kinh Doanh: <strong>KINGSHOES</strong></p>
            <p>Hotline: <a href="tel:0905.221426" style={{ color: "#1ABC9C" }}>0765.218.019</a></p>
          </div>
          <div>
            <h3 style={{ margin: "10px 0", color: "#1ABC9C" }}>HỖ TRỢ KHÁCH HÀNG</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
              <li>Chăm sóc khách hàng</li>
              <li>Thanh toán</li>
              <li>Hướng dẫn mua hàng</li>
            </ul>
          </div>
          <div>
            <h3 style={{ margin: "10px 0", color: "#1ABC9C" }}>CHÍNH SÁCH</h3>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
              <li>Chế độ bảo hành</li>
              <li>Chính sách đổi hàng</li>
              <li>Bảo mật thông tin</li>
              <li>Chính sách giao nhận</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
