import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Nhận dữ liệu từ trang Cart
  const { cart = [], totalPrice = 0 } = location.state || {}; 

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Hàm xử lý thay đổi thông tin khách hàng
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // Hàm xử lý khi người dùng bấm Đặt mua
  const handleSubmit = () => {
    // Kiểm tra xem tất cả thông tin đã được nhập chưa
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin khách hàng.");
      return;
    }

    // Kiểm tra số điện thoại có đủ 10 số và bắt đầu bằng số 0 không
    const phoneRegex = /^(0\d{9})$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      setErrorMessage("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (10 chữ số, bắt đầu bằng 0).");
      return;
    }

    // Reset thông báo lỗi khi thông tin hợp lệ
    setErrorMessage("");

    // Nếu thông tin hợp lệ, điều hướng đến trang thành công
    console.log("Order submitted:", {
      cart,
      ...customerInfo,
    });
    navigate("/success");
  };

  return (
    <div className="checkout">
      <h1>Trang thanh toán</h1>
      {cart.length > 0 ? (
        <div>
          <div className="checkout-product">
          <ul>
              {cart.map((product, index) => (
                <li key={index}>
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <p>{product.name}</p>
                    <p>Size: {product.selectedSize}</p>
                    <p>Số lượng: {product.quantity}</p>
                    <p>Giá: {product.price} VND</p>
                    <p>Tổng: {product.price * product.quantity} VND</p>
                  </div>
                </li>
              ))}
          </ul>

              
          </div>
          <div>
            <p><strong>Tổng giá trị:</strong> {totalPrice} VND</p>
          </div>
        </div>
      ) : (
        <p>Giỏ hàng của bạn hiện đang trống.</p>
      )}
      <form className="checkout-form">
        <label>
          Họ tên:
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Số điện thoại:
          <input
            type="text"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Địa chỉ:
          <textarea
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Phương thức thanh toán:
          <select
            name="paymentMethod"
            value={customerInfo.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="cod">Thanh toán khi nhận hàng</option>
            <option value="transfer">Chuyển khoản</option>
          </select>
        </label>

        {customerInfo.paymentMethod === "transfer" && (
          <div className="qr-section">
            <h3>Thông tin chuyển khoản:</h3>
            <p><strong>Ngân hàng:</strong> MBBank</p>
            <p><strong>Tên chủ tài khoản:</strong> Nguyễn Đinh lộc</p>
            <p><strong>Số tài khoản:</strong> 0788658021</p>
            <QRCodeSVG value="https://example.com" size={256} />
          </div>
        )}

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="button" onClick={handleSubmit}>
          Đặt mua
        </button>
      </form>
      <footer
      style={{
        backgroundColor: "#2C3E50", // Nền màu xanh đậm
        color: "#fff", // Văn bản màu trắng
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          borderBottom: "1px solid #1ABC9C",
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span role="img" aria-label="email">
              📧
            </span>
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
            
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center", flex: "1", minWidth: "200px", padding: "10px" }}>
          <img
            src="./images/QRN.jpg"
            alt="Logo King Shoes"
            style={{ marginBottom: "15px", width: "100px", borderRadius: "50%" }}
          />
          <h3 style={{ margin: "10px 0", color: "#1ABC9C" }}>THÔNG TIN LIÊN HỆ</h3>
          <p>Số ĐKKD: 41N8041309 cấp ngày 17/8/2018</p>
          <p>Nơi cấp: UBND PHƯỜNG VĨNH ĐIỆN</p>
          <p>
            Hộ Kinh Doanh: <strong>KINGSHOES</strong>
          </p>
          <p>
            Hotline: <a href="tel:0905.221426" style={{ color: "#1ABC9C" }}>0765.218.019</a>
          </p>
        </div>
            
        <div style={{ flex: "1", minWidth: "200px", padding: "10px" }}>
          <h3 style={{ margin: "10px 0", color: "#1ABC9C" }}>HỖ TRỢ KHÁCH HÀNG</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li>Chăm sóc khách hàng</li>
            <li>Thanh toán</li>
            <li>Hướng dẫn mua hàng</li>
          </ul>
        </div>
            
        <div style={{ flex: "1", minWidth: "200px", padding: "10px" }}>
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
};

export default Checkout;
