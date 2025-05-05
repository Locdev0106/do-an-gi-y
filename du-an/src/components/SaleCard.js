import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SaleCard.css";

// Hàm format giá VNĐ
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).replace('₫', '') + ' VNĐ'; // Thêm VNĐ vào sau giá trị
};

const SaleCard = ({ product, addToCart, removeFromCart, updateQuantity, cart }) => {
  // Giữ gọi useState và useNavigate ngoài các điều kiện
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  if (!product) {
    return <div className="product-card-sale">Sản phẩm không tồn tại.</div>;
  }

  const { id, name, price, image, discount = 0 } = product; // Đảm bảo discount mặc định là 0 nếu không có

  // Tính giá sau giảm giá nếu có
  const discountedPrice = discount > 0 ? price - (price * discount / 100) : price;

  const handleViewDetails = () => {
    navigate(`/product/${id}`); // Điều hướng đến trang ProductDetail với ID sản phẩm
  };

  // Tính tổng giá trị giỏ hàng
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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

  const handleBuyNow = () => {
    // Chuyển toàn bộ giỏ hàng và tổng giá trị sang Checkout
    navigate("/checkout", {
      state: { cart, totalPrice: calculateTotalPrice() },
    });
  };

  return (
    <div className="product-card-sale">
      <div className="product-khung-sale">
        <img
          src={image}
          alt={name}
          className="product-image-sale"
          onClick={handleViewDetails}
        />
        <h3 className="product-name-sale" onClick={handleViewDetails}>
          {name}
        </h3>
      </div>
      
      <div className="product-price-sale">
        {discount > 0 ? (
          <>
            <span className="original-price-sale">{formatPrice(price)}</span>
            <span className="discounted-price-sale">{formatPrice(discountedPrice)}</span>
          </>
        ) : (
          formatPrice(price)
        )}
      </div>

      {/* Hiển thị thông tin giảm giá nếu có */}
      {discount > 0 && (
        <div className="discount-info-sale">
          <span className="discount-badge-sale">-{discount}%</span>
        </div>
      )}

      <div className="product-actions-sale">
        <button className="add-to-cart-sale" onClick={handleViewDetails}>
          Chi tiết sản phẩm
        </button>
      </div>
    </div>
  );
};


export default SaleCard;
