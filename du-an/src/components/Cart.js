import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// Hàm định dạng giá theo VNĐ
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  }).replace("₫", "") + " VNĐ"; // Thêm VNĐ vào sau giá trị
};

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // Khi cart thay đổi, cập nhật selectedProducts mặc định
    setSelectedProducts(cart.map((product) => product.id));
  }, [cart]);

  // Hàm cập nhật size giày
  const handleSizeChange = (productId, newSize) => {
    const updatedCart = cart.map((product) =>
      product.id === productId ? { ...product, selectedSize: newSize } : product
    );
    setCart(updatedCart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 0) return;
    updateCart(productId, newQuantity);
  };

  const updateCart = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeProduct(productId);
    } else {
      const updatedCart = cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      );
      setCart(updatedCart);
    }
  };

  // Hàm xóa sản phẩm
  const removeProduct = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    setSelectedProducts((prev) =>
      prev.filter((id) => id !== productId) // Cập nhật danh sách sản phẩm được chọn
    );
  };

  // Hàm xóa tất cả sản phẩm được chọn
  const removeAllSelected = () => {
    const updatedCart = cart.filter(
      (product) => !selectedProducts.includes(product.id)
    );
    setCart(updatedCart);
    setSelectedProducts([]); // Reset danh sách chọn
  };

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Xử lý chọn tất cả sản phẩm
  const handleSelectAll = () => {
    if (selectedProducts.length === cart.length) {
      setSelectedProducts([]); // Bỏ chọn tất cả
    } else {
      setSelectedProducts(cart.map((product) => product.id)); // Chọn tất cả
    }
  };

  // Điều hướng tới trang Checkout
  const handleCheckout = () => {
    const selectedCart = cart.filter((product) =>
      selectedProducts.includes(product.id)
    );
    const totalPrice = selectedCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    navigate("/checkout", { state: { cart: selectedCart, totalPrice } });
  };

  // Tổng sl và gtrị chỉ dựa trên sản phẩm được chọn
  const selectedCart = cart.filter((product) =>
    selectedProducts.includes(product.id)
  );
  const totalQuantity = selectedCart.reduce(
    (total, product) => total + (product.quantity || 0),
    0
  );
  const totalPrice = selectedCart.reduce((total, product) => {
    const price = parseFloat(product.price) || 0;
    const quantity = parseInt(product.quantity) || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className="cart">
      <h1>Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn hiện đang trống.</p>
      ) : (
        <div>
          <div className="select-all">
            <input
              type="checkbox"
              checked={selectedProducts.length === cart.length}
              onChange={handleSelectAll}
            />
            <label>Chọn tất cả</label>
          </div>
          <ul>
            {cart.map((product, index) => {
              const price = parseFloat(product.price) || 0;
              const quantity = parseInt(product.quantity) || 0;
              const productTotal = price * quantity;

              return (
                <li key={index}>
                  <div className="cart-item">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductSelection(product.id)}
                    />
                    <img src={product.image} alt={product.name} width={50} />
                    <p>{product.name}</p>
                   
                    <label>Size:</label>
                    <select
                      value={product.selectedSize}
                      onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    >
                      {product.sizes?.map((size) => (  
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <p>Giá: {formatPrice(price)}</p>
                    <div className="quantity-control">
                      <button className="cart-control"
                        onClick={() =>
                          handleQuantityChange(product.id, quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button className="cart-control"
                        onClick={() =>
                          handleQuantityChange(product.id, quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>Tổng: {formatPrice(productTotal)}</p>
                    <button
                      className="remove-selected"
                      onClick={() => removeProduct(product.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-summary">
            <p>
              <strong>Tổng số sản phẩm:</strong> {totalQuantity}
            </p>
            <p>
              <strong>Tổng giá trị:</strong> {formatPrice(totalPrice)}
            </p>
            <div className="actions">
              <button
                className="remove-selected"
                onClick={removeAllSelected}
                disabled={selectedProducts.length === 0}
              >
                Xóa tất cả
              </button>
              <button
                className="buy-now"
                onClick={handleCheckout}
                disabled={selectedProducts.length === 0}
              >
                Đặt mua
              </button>
            </div>
          </div>
        </div>
      )}
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

export default Cart;
