import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./Success.css"; 

const Success = () => {
  const navigate = useNavigate();

  // Điều hướng tự động về trang chủ sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success30">
      <div className="success-message30">
        <FaCheckCircle className="success-icon30" />
        <h2>Đơn hàng của bạn đã được đặt thành công!</h2>
        <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>
        <p>Bạn sẽ được chuyển hướng về trang chủ trong vài giây...</p>
        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default Success;
