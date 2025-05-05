import React, { useState } from "react";
import NikeCard from "./NikeCard";
import "./ProductList.css";
import { useSelector } from "react-redux"; // Import useSelector
import "./Nike.css";

function Nike({ searchQuery, addToCart, updateQuantity, removeFromCart }) {
  const [filterPrice, setFilterPrice] = useState([0, 10000000]); // Khoảng giá
  const [filterSize, setFilterSize] = useState([]); // Size lọc
  const products = useSelector((state) => state.product.products || []); // Đảm bảo có giá trị mặc định là mảng rỗng

  const filteredProducts = products.filter((product) => {
    const name = product.name ? product.name.toLowerCase() : ''; // Kiểm tra nếu name không phải undefined
    const brand = product.brand ? product.brand.toLowerCase() : ''; // Kiểm tra nếu brand không phải undefined
    
    const isMatchQuery = name.includes(searchQuery.toLowerCase()); // Tìm kiếm theo tên sản phẩm
    const isWithinPriceRange = product.price >= filterPrice[0] && product.price <= filterPrice[1]; // Lọc theo giá
    const hasSelectedSize = filterSize.length === 0 || product.sizes.some(size => filterSize.includes(size)); // Lọc theo size
    const isNikeInName = name.includes("nike");  // Lọc sản phẩm có tên chứa "Yeezy"
    const isNikeBrand = brand === "nike";  // Lọc sản phẩm có thương hiệu "Yeezy"
    
    // Kết hợp tất cả các điều kiện lọc
    return (
      isMatchQuery && 
      isWithinPriceRange && 
      hasSelectedSize && 
      (isNikeInName || isNikeBrand) // Hiển thị sản phẩm nếu tên hoặc brand là "Yeezy"
    );
  });
  
  
  return (
    <div className="product-list-container">
      {/* Thanh lọc sản phẩm */}
      <div className="filters">
        <div className="filter-section">
          <label>Khoảng giá:</label>
          <select onChange={(e) => setFilterPrice(e.target.value.split("-").map(Number))}>
            <option value="0-10000000">Tất cả</option>
            <option value="0-2000000">Dưới 2 triệu</option>
            <option value="2000000-5000000">Từ 2 - 5 triệu</option>
            <option value="5000000-10000000">Trên 5 triệu</option>
          </select>
        </div>

        <div className="filter-section">
          <label>Size:</label>
          {[38, 39, 40, 41, 42, 43, 44].map((size) => (
            <label key={size} className="size-checkbox">
              <input
                type="checkbox"
                value={size}
                onChange={() => setFilterSize((prev) => 
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-list1">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <NikeCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))
        ) : (
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        )}
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
}

export default Nike;
