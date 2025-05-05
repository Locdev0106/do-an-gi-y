import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/auth/authSlice"; // Import action addUser
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState(""); // Họ tên
  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      return;
    }

    // Kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái hoa!");
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Kiểm tra họ tên
    if (!fullName.trim()) {
      setError("Họ tên không được để trống!");
      return;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 số!");
      return;
    }

    // Gửi thông tin người dùng mới vào Redux store
    const newUser = {
      id: Date.now(), // Tạo ID duy nhất
      username: username || email.split("@")[0], // Lấy username từ email nếu không nhập
      fullName, // Họ tên
      phoneNumber, // Số điện thoại
      email,
      password,
      role: "user", // Mặc định quyền là "user"
    };
    dispatch(addUser(newUser));

    // Điều hướng đến trang đăng nhập
    setError("");
    navigate("/dangnhap");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="logo">
          <img src="/images/logo8.png" alt="Logo" />
        </div>
        <h2>Đăng ký</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Họ tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            ĐĂNG KÝ
          </button>
        </form>
      </div>
      <footer>
        <div className="footer-content">
          <div className="newsletter">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span role="img" aria-label="email">📧</span>
              <span style={{ fontWeight: "bold" }}>ĐĂNG KÝ NHẬN PHIẾU GIẢM GIÁ</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="email"
                placeholder="Địa chỉ mail của bạn"
              />
              <button>ĐĂNG KÝ</button>
            </div>
            <div>
              <span style={{ color: "#1ABC9C", fontWeight: "bold" }}>
                Nhận Ngay VOUCHER 100k cho 500 khách hàng đầu tiên
              </span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", flexWrap: "wrap" }}>
            <div className="footer-logo">
              <img src="./images/QRN.jpg" alt="Logo King Shoes" />
              <h3>THÔNG TIN LIÊN HỆ</h3>
              <p>Số ĐKKD: 41N8041309 cấp ngày 17/8/2018</p>
              <p>Nơi cấp: UBND PHƯỜNG VĨNH ĐIỆN</p>
              <p>
                Hộ Kinh Doanh: <strong>KINGSHOES</strong>
              </p>
              <p>Hotline: <a href="tel:0765218019">0765.218.019</a></p>
            </div>

            <div>
              <h3>HỖ TRỢ KHÁCH HÀNG</h3>
              <ul>
                <li>Chăm sóc khách hàng</li>
                <li>Thanh toán</li>
                <li>Hướng dẫn mua hàng</li>
              </ul>
            </div>

            <div>
              <h3>CHÍNH SÁCH</h3>
              <ul>
                <li>Chế độ bảo hành</li>
                <li>Chính sách đổi hàng</li>
                <li>Bảo mật thông tin</li>
                <li>Chính sách giao nhận</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
