import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

// Hàm format giá VNĐ
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).replace('₫', '') + ' VNĐ'; // Thêm VNĐ vào sau giá trị
};

const ProductCard = ({ product, addToCart, removeFromCart, updateQuantity, cart }) => {
  // Giữ gọi useState và useNavigate ngoài các điều kiện
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  if (!product) {
    return <div className="product-card">Sản phẩm không tồn tại.</div>;
  }

  const { id, name, price, discount, image } = product;

  // Tính giá sau giảm giá nếu có
  const discountedPrice = discount > 0 ? price - (price * discount / 100) : price;

  const handleViewDetails = () => {
    navigate(`/product/${id}`); // Điều hướng đến trang ProductDetail với ID sản phẩm
  };

  // Tính tổng giá trị giỏ hàng

  const handleAdd = () => {
    setQuantity(quantity + 1);
    addToCart(product); // Thêm vào giỏ hàng
    if (updateQuantity) {
      updateQuantity(id, quantity + 1); // Cập nhật số lượng
    }
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeFromCart(product); // Xóa khỏi giỏ hàng
      if (updateQuantity) {
        updateQuantity(id, quantity - 1); // Cập nhật số lượng
      }
    }
  };


  return (
    <div className="product-card">
      <div className="product-khung">
        <img
          src={image}
          alt={name}
          className="product-image"
          onClick={handleViewDetails}
        />
        <h3 className="product-name" onClick={handleViewDetails}>
          {name}
        </h3>
      </div>
      
      <div className="product-price">
        {discount > 0 ? (
          <>
            <span className="original-price">{formatPrice(price)}</span>
            <span className="discounted-price">{formatPrice(discountedPrice)}</span>
          </>
        ) : (
          formatPrice(price)
        )}
      </div>

      {/* Hiển thị thông tin giảm giá nếu có */}
      {discount > 0 && (
        <div className="discount-info-sale">
          <span className="discount-badge">-{discount}%</span>
        </div>
      )}

      <div className="product-actions">
        <button className="add-to-cart" onClick={handleViewDetails}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

// Đặt giá trị mặc định nếu không truyền prop
ProductCard.defaultProps = {
  addToCart: () => console.warn("addToCart is not defined"),
  removeFromCart: () => console.warn("removeFromCart is not defined"),
  updateQuantity: () => console.warn("updateQuantity is not defined"),
  cart: [], // Giỏ hàng mặc định
};

export default ProductCard;
