import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ React Router
import { products } from "./ProductData"; // Import dữ liệu sản phẩm từ productData
import './Home.css';  // Giả sử bạn có file CSS riêng cho trang chủ

const getRandomProducts = (products, count = 12) => {
    const shuffled = [...products].sort(() => Math.random()); // Xáo trộn sản phẩm
    return shuffled.slice(0, count); // Lấy 12 sản phẩm ngẫu nhiên
};

const Home = () => {
    const newProducts = getRandomProducts(products, 12);  // Lấy 12 sản phẩm ngẫu nhiên cho sản phẩm mới
    const discountedProducts = getRandomProducts(products.filter(product => product.discount > 0), 12);  // Lọc sản phẩm giảm giá và lấy 12 sản phẩm ngẫu nhiên
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Trạng thái lưu trữ chỉ số ảnh hiện tại
    const images = ['./images/banner5.jpg', './images/banner6.jpg', './images/banner7.jpg', './images/banner8.jpg'];
    useEffect(() => {
      const interval = setInterval(() => {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length); // Tăng chỉ số ảnh và quay lại đầu khi hết
      }, 3000); // Mỗi 3 giây thay đổi ảnh

      return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);
    return (
        <div className="home">
           <div className="large-image4">
                {/* Slider tự cuộn ảnh */}
                <div className="image-slider">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Slider Image ${currentImageIndex + 1}`}  // Thêm mô tả cho ảnh
                        className="slider-image"
                    />
                </div>
            </div>

            {/* Sản phẩm mới */}
            <div className="new-products-section">
                <h2>Sản phẩm mới</h2>
                <div className="product-display4">
                    {newProducts.map(product => (
                        <div key={product.id} className="product-card4">
                            <Link to={`/product/${product.id}`}> {/* Link tới chi tiết sản phẩm */}
                                <img src={product.image} alt={product.name} className="product-image4" />
                            </Link>
                            {product.discount > 0 && (
                                <div className="discount-tag4">{product.discount}% OFF</div>
                            )}
                            <h3>{product.name}</h3>
                            <div className="price-info">
                                {product.oldPrice && <span className="old-price4">${product.oldPrice}</span>}
                                <span className="price4">${product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sản phẩm giảm giá */}
            <div className="discounted-products-section">
                <h2>Sản phẩm giảm giá</h2>
                <div className="product-display4">
                    {discountedProducts.map(product => (
                        <div key={product.id} className="product-card4">
                            <Link to={`/product/${product.id}`}> {/* Link tới chi tiết sản phẩm */}
                                <img src={product.image} alt={product.name} className="product-image4" />
                            </Link>
                            <div className="discount-tag4">{product.discount}% OFF</div>
                            <h3>{product.name}</h3>
                            <div className="price-info">
                                <span className="old-price4">${product.oldPrice}</span>
                                <span className="price4">${product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer
      style={{
        backgroundColor: "#2C3E50", 
        color: "#fff", 
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

export default Home;
