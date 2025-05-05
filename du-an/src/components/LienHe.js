import React, { useState } from "react";
import "./LienHe.css";

const LienHe = () => {
  const [formSubmitted, setFormSubmitted] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setFormSubmitted(true); 
  };

  return (
    <div className="lien-he-container">
    
      <div className="info-container">
       
        <p><strong>Địa chỉ:</strong> Phường Vĩnh Điện - Thị Xã Điện Bàn - Tỉnh Quảng Nam</p>
        <p><strong>Email:</strong> cskh.kingshoes.vn@gmail.com</p>
        <ul className="social-links">
          <li><a href="https://kingshoes.vn/" target="_blank" rel="noopener noreferrer">Website chính thức</a></li>
          <li><a href="https://facebook.com/pg/www.KingShoes.vn" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://youtu.be/xICVTMC3oyI?si=i_Fpdj_Oteq64sPM" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          
        </ul>
        <p>
          <strong>Hotline Bán Hàng:</strong> 0765218019
          <br />
          <strong>Hotline CSKH:</strong> 090522222
        </p>
        <iframe
          className="youtube-video"
          src="https://www.youtube.com/embed/XmflfpNdxtc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

     
      <div className="form-container">
        {formSubmitted ? (
          <div className="thank-you-message">
            <h2>Cảm ơn quý khách đã góp ý!</h2>
            <p>Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.</p>
          </div>
        ) : (
          <>
            <h2>Hãy Góp Ý Cho Chúng Tôi</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Nội dung"
                className="form-textarea"
                required
              ></textarea>
             <input
              type="text"
              placeholder="Họ Và Tên *"
              className="contact-input contact-name"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              className="contact-input contact-email"
              required
            />
            <input
              type="tel"
              placeholder="Điện thoại *"
              className="contact-input contact-phone"
              required
            /> 
              <select className="form-select" required>
                <option value="">Chọn danh mục câu hỏi *</option>
                <option value="products">Sản phẩm</option>
                <option value="services">Dịch vụ</option>
                <option value="support">Hỗ trợ khách hàng</option>
                <option value="support">Khiếu Nại</option>
              </select>
              <div className="form-buttons100">
                <button type="submit" className="btn-submit100">GỬI NGAY</button>
                <button type="reset" className="btn-reset100">NHẬP LẠI</button>
              </div>
            </form>
          </>
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
};

export default LienHe;