import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../features/product/productSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [searchQuery, setSearchQuery] = useState(""); // State cho seach

  // State qly modal
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    sizes: "",
    discount: "",
    quantity: "",
    brand: "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProduct));
    setShowModal(false); 
    setNewProduct({
      id: "",
      name: "",
      price: "",
      image: "",
      sizes: "",
      discount: "",
      quantity: "",
      brand: "", 
    }); 
  };

  // Lọc danh sách sản phẩm theo ID hoặc tên
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.id.toString().includes(query) || 
      product.name.toLowerCase().includes(query) 
    );
  });

  return (
    <div className="product-management">
      <h2>Quản lý sản phẩm</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm theo ID hoặc tên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button onClick={() => setShowModal(true)}>Thêm sản phẩm</button>

      {/*  modal thêm sp*/}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thêm sản phẩm mới</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>ID:</label>
                <input
                  type="text"
                  name="id"
                  value={newProduct.id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Tên sản phẩm:</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Giá:</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Hình ảnh (URL):</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Size:</label>
                <input
                  type="text"
                  name="sizes"
                  value={newProduct.sizes}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Thương hiệu (Brand):</label>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Giảm giá:</label>
                <input
                  type="number"
                  name="discount"
                  value={newProduct.discount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Thêm sản phẩm</button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="close-button"
              >
                Đóng
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ds sp */}
      <div className="product-list16">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item16">
              <img
                src={product.image}
                alt={product.name}
                className="product-image16"
              />
              <div className="product-info16">
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Tên:</strong> {product.name}</p>
                <p><strong>Thương hiệu:</strong> {product.brand}</p>
                <p>Size: {product.sizes}</p>
                <p>Số lượng còn: {product.quantity}</p>
                <p>Giá: {product.price} VND</p>
                <button onClick={() => dispatch(removeProduct(product.id))}>
                  Xóa sản phẩm
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
