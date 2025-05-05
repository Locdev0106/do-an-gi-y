import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./YeezyCard.css";

// Hàm format giá VNĐ
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).replace('₫', '') + ' VNĐ'; // Thêm VNĐ vào sau giá trị
};

const YeezyCard = ({ product, addToCart, removeFromCart, updateQuantity, cart }) => {
  const navigate = useNavigate();

  if (!product) {
    return <div className="product-card2">Sản phẩm không tồn tại.</div>;
  }

  const { id, name, price, discount, image } = product;
  const discountedPrice = discount > 0 ? price - (price * discount / 100) : price;
  
  const handleViewDetails = () => {
    navigate(`/2product/${id}`);
  };


  return (
<div className="product-container2">
  <div className="product-card2 ">
    <div className="product-image2  ">
      <img src={image} alt={name} className="product-image-content2" onClick={handleViewDetails} />
    </div>
    <div className="product-name2" onClick={handleViewDetails}>
      <h3>{name}</h3>
    </div>
    <div className="product-price2">
      <div className="price2">
        <span className="original-price2">{formatPrice(price)}</span>
        <span className="discounted-price2">{formatPrice(discountedPrice)}</span>
      </div>
      {/* Hiển thị thông tin giảm giá nếu có */}
      {discount > 0 && (
        <div className="discount-info-sale2">
          <span className="discount-badge2">-{discount}%</span>
        </div>
      )}
    </div>
    <div className="product-actions2">
      <button className="add-to-cart2"onClick={handleViewDetails}>Xem chi tiết</button>
    </div>
  </div>
</div>



  );
};

YeezyCard.defaultProps = {
  addToCart: () => console.warn("addToCart is not defined"),
  removeFromCart: () => console.warn("removeFromCart is not defined"),
  updateQuantity: () => console.warn("updateQuantity is not defined"),
  cart: [],
};

export default YeezyCard;
