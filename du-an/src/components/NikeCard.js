import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NikeCard.css";

// Hàm format giá VNĐ
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).replace('₫', '') + ' VNĐ'; // Thêm VNĐ vào sau giá trị
};

const NikeCard = ({ product, addToCart, removeFromCart, updateQuantity, cart }) => {
  // Giữ gọi useState và useNavigate ngoài các điều kiện
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  if (!product || !product.name || !product.price) {
    return <div className="product-card">Sản phẩm không tồn tại.</div>;
  }
  

  const { id, name, price, discount, image } = product;

  // Tính giá sau giảm giá nếu có
  const discountedPrice = discount > 0 ? price - (price * discount / 100) : price;

  const handleViewDetails = () => {
    navigate(`/3product/${id}`);
  };

  return (
<div className="product-card-3">
  {discount > 0 && (
    <span className="discount-badge-3">-{discount}%</span>
  )}

  <div className="product-image-container-3" onClick={handleViewDetails}>
    <img src={image} alt={name} className="product-image-3" />
  </div>

  <h3 className="product-name-3" onClick={handleViewDetails}>
    {name}
  </h3>

  <div className="product-price-3">
    {discount > 0 ? (
      <>
        <span className="original-price-3">{formatPrice(price)}</span>
        <span className="discounted-price-3">{formatPrice(discountedPrice)}</span>
      </>
    ) : (
      <span className="final-price-3">{formatPrice(price)}</span>
    )}
  </div>

  <div className="product-actions-3">
    <button className="add-to-cart-3" onClick={handleViewDetails}>
      Chi tiết sản phẩm
    </button>
  </div>
</div>

  );
};

// Đặt giá trị mặc định nếu không truyền prop
NikeCard.defaultProps = {
  addToCart: () => console.warn("addToCart is not defined"),
  removeFromCart: () => console.warn("removeFromCart is not defined"),
  updateQuantity: () => console.warn("updateQuantity is not defined"),
  cart: [], // Giỏ hàng mặc định
};

export default NikeCard;
