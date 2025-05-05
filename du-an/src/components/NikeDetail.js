import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NikeDetail.css";

const NikeDetail = ({ product, addToCart, cart, products }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 5,
    comment: "",
  });
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái để hiển thị thông tin đầy đủ

  // State for modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const foundProduct = products.find((prod) => prod.id === Number(id));
      setProductDetails(foundProduct);
    } else {
      console.error("Products is not defined or is not an array.");
    }

    setReviews([
      {
        user: "Nguyễn Văn A",
        rating: 5,
        comment: "Sản phẩm rất tốt, đáng tiền!",
        date: "2024-12-01",
      },
      {
        user: "Trần Thị B",
        rating: 4,
        comment: "Giày đẹp nhưng giao hàng hơi chậm.",
        date: "2024-12-02",
      },
    ]);
  }, [id, products]);

  if (!productDetails) return <p>Đang tải sản phẩm...</p>;

  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (type) =>
    setQuantity(type === "increase" ? quantity + 1 : Math.max(quantity - 1, 1));

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Hiển thị modal yêu cầu đăng nhập
      return;
    }
    if (!selectedSize) {
      alert("Vui lòng chọn size trước khi mua.");
      return;
    }
    const totalPrice = productDetails.price * quantity;
    const checkoutData = {
      cart: [
        {
          ...productDetails,
          selectedSize,
          quantity,
          totalPrice: productDetails.price * quantity,
        },
      ],
      totalPrice: productDetails.price * quantity,
    };
    navigate("/checkout", { state: checkoutData });
  };

  const handleAdd = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Hiển thị modal yêu cầu đăng nhập
      return;
    }
    if (!selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng.");
      return;
    }
    
    const updatedCart = [...cart];
    updatedCart.push({
      ...productDetails,
      selectedSize,
      quantity,
    });
    
    const existingItemIndex = cart.findIndex(
      (item) => item.id === productDetails.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      addToCart(updatedCart);
    } else {
      addToCart(productDetails);
    }
  };

  // Handle modal close and navigate to login page
  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/dangnhap");  // Chuyển hướng đến trang đăng nhập
  };

  const handleModalClose = () => setShowLoginModal(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);  // Hàm chuyển trạng thái mở/đóng


  return (
    <div className="product-detail-3">
      {/* 1. Ảnh sản phẩm */}
      <div className="product-images-3">
        <img src={productDetails.image || "default-image.jpg"} alt="Main product" />
      </div>

      {/* 2. Thông tin sản phẩm */}
      <div className="product-info-3">
        <h1>{productDetails.name}</h1>
        <p className="product-code-3">Mã SP: {productDetails.id}</p>
        <p className="product-price-3">{productDetails.price.toLocaleString("vi-VN")} đ</p>

        {/* 3. Chọn size và số lượng */}
        <div className="size-selector-3">
          <p>Chọn size giày:</p>
          {productDetails.sizes.map((size) => (
            <button key={size} onClick={() => handleSizeSelect(size)}>
              {size}
            </button>
          ))}
        </div>

        {/* 4. Chỉnh sửa số lượng */}
        <div className="quantity-selector-3">
          <button onClick={() => handleQuantityChange("decrease")}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange("increase")}>+</button>
        </div>

        {/* 5. Các nút hành động */}
        <div className="cart-buttons-3">
          <button className="buy-now-3" onClick={handleBuyNow}>Mua ngay</button>
          <button className="add-to-cart-3" onClick={handleAdd}>Thêm vào giỏ</button>
        </div>
      </div>

      {/* 6. Mô tả sản phẩm */}
      <div className="product-description-3">
        <h2>Thông tin sản phẩm</h2>
        <div className="info-title">👉 Bảo Hành và CSKH:</div>
        <ul className="info-list">
          <li>✔️ Trong 03 ngày kể từ khi nhận được sản phẩm</li>
          <li>✔️ Nếu sản phẩm sai mẫu mã, bị lỗi, quý khách hãy ibx shop để đổi sản phẩm.</li>
          <li>✔️ Quý khách được đổi với sản phẩm mới ngang hoặc cao giá hơn</li>
          <li>✔️ 1 sản phẩm, chỉ được đổi trả 1 lần duy nhất.</li>
          <li>✔️ Cần tư vấn về sản phẩm hãy nhắn tin cho shop. Up 1 size vs chân bị bè.</li>
          <li>✔️ Đến với Shop bạn hoàn toàn có thể yên tâm hàng đảm bảo chất lượng, tốt nhất trong tầm giá</li>
        </ul>
        <div className={isExpanded ? "expanded" : "collapsed"}>
          <div className="info-title">👉 Hướng dẫn sử dụng:</div>
          <ul className="info-list">
            <li>⛔ Không dùng hóa chất hay bột giặt có hoạt tính tẩy rửa mạnh</li>
            <li>⛔ Không dùng bàn chải cứng để vệ sinh giày sẽ làm hư</li>
            <li>⛔ Không đi mưa ngâm nước lâu, không phơi giày trực tiếp dưới ngoài trời nắng gắt</li>
            <li>⛔ Với các sản phẩm sáng màu, nên vệ sinh thường xuyên</li>
            <li>⛔ Tránh cất giữ giày khi còn ướt, ẩm.</li>
          </ul>
          <div className="info-title">👉 Thông tin sản phẩm:</div>
          <ul className="info-list">
            <li>✔️ Chất lượng tốt nhất trong tầm giá</li>
            <li>✔️ Form đẹp chuẩn: Màu sắc giống đến 98°/ₒ</li>
            <li>✔️ Chất liệu da + da lộn + vải mesh</li>
            <li>✔️ Logo Mông in dập chìm</li>
            <li>✔️ Lưỡi gà cao dày dặn; swoosh sắc nét; Mông mũi làm đẹp</li>
            <li>✔️ Tem QR CODE có thể check mã 2D</li>
            <li>✔️ Đế 2 lớp khâu chỉ đều</li>
            <li>✔️ Full box + accessories</li>
            <li>✔️ Mẫu này bạn mang đúng hoặc up 1 size đối với chân bè</li>
          </ul>

          <div className="info-title">👉 Cam kết với khách hàng về sản phẩm:</div>
          <ul className="info-list">
            <li>✔️ Sản phẩm 100% giống với mô tả.</li>
            <li>✔️ Giao hàng đúng size, lỗi 1 đổi 1.</li>
            <li>✔️ Giao hàng trên toàn quốc theo hình thức COD, ví Airpay, internet banking..</li>
          </ul>

          <div className="info-note">
            <strong>Lưu ý:</strong> Sản phẩm được bảo hành 6 tháng trên toàn quốc.
          </div>

          <div className="info-title">❌ Lưu ý khi nhận hàng:</div>
          <ul className="info-list">
            <li>✅ Bao kiểm tra hàng trước thanh toán (Gọi cho shop theo hotline nếu bưu tá không cho kiểm)</li>
            <li>✅ Hỗ trợ đổi size nếu khách đặt nhầm size giày, lỗi nhà sản xuất</li>
            <li>✅ Tất cả các sản phẩm đã được chọn lựa kỹ trước khi cung cấp cho khách hàng</li>
            <li>✅ Sản phẩm bao gồm đầy đủ: hộp, tag, giấy gói và phụ kiện.</li>
          </ul>
        </div>

        <button onClick={toggleExpand} className="toggle-expand">
          {isExpanded ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>

      {/* 7. Đánh giá sản phẩm */}
      <div className="product-reviews-3">
        <h3>Đánh giá sản phẩm</h3>
        {reviews.map((review, index) => (
          <div key={index} className="review-item-3">
            <p><strong>{review.user}</strong> ({review.date})</p>
            <p>{review.rating} ⭐</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* 8. Thêm đánh giá */}
      <div className="add-review-3">
        <h3>Thêm đánh giá</h3>
        <input type="text" name="user" placeholder="Tên của bạn" value={newReview.user} onChange={(e) => setNewReview({ ...newReview, user: e.target.value })} />
        <select name="rating" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}>
          {[5, 4, 3, 2, 1].map((num) => <option key={num} value={num}>{num} ⭐</option>)}
        </select>
        <textarea name="comment" placeholder="Nhận xét của bạn" value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}></textarea>
        <button onClick={() => setReviews([newReview, ...reviews])}>Gửi đánh giá</button>
      </div>

      {/* Modal thông báo yêu cầu đăng nhập */}
      {showLoginModal && (
        <div className="login-modal">
          <div className="modal-content">
            <h3>Bạn cần đăng nhập để thực hiện thao tác này</h3>
            <div className="modal-buttons">
              <button onClick={handleLoginRedirect}>Đồng ý</button>
              <button onClick={handleModalClose}>Hủy</button>
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

export default NikeDetail;
