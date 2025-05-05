import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../components/ProductData";

const initialState = {
  products: products,
  cart: [], // Giỏ hàng
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Thêm sản phẩm mới vào danh sách sản phẩm
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // Cập nhật sản phẩm trong danh sách sản phẩm
    updateProduct: (state, action) => {
      const { id, updatedData } = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updatedData,
        };
      }
    },

    // Xóa sản phẩm khỏi danh sách sản phẩm
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    // Cập nhật số lượng tồn kho của sản phẩm
    updateStock: (state, action) => {
      const { quantity } = action.payload;
      const product = state.products.find((product) => product.quantity === quantity);
      if (product) {
        product.quantity = (product.quantity) + quantity;
        if (product.quantity < 0) product.quantity = 0; // Đảm bảo số lượng không âm
      }
    },

    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action) => {
      const { product, quantity, selectedSize } = action.payload;

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng với kích thước đã chọn chưa
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      // Nếu sản phẩm đã có, tăng số lượng lên
      if (existingProductIndex >= 0) {
        state.cart[existingProductIndex].quantity += quantity;
      } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
        state.cart.push({ ...product, quantity, selectedSize });
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id || item.selectedSize !== action.payload.selectedSize);
    },

    // Lưu danh sách sản phẩm mới vào state (ví dụ: sau khi lấy dữ liệu từ API)
    setProducts: (state, action) => {
      state.products = action.payload.filter(product => product.brand.toLowerCase());
    },

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartQuantity: (state, action) => {
      const { id, quantity, selectedSize } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id && item.selectedSize === selectedSize);
      if (cartItem) {
        cartItem.quantity = quantity; // Cập nhật lại số lượng sản phẩm trong giỏ hàng
      }
    },
  },
});

// Export reducers
export const {
  addProduct,
  updateProduct,
  removeProduct,
  updateStock,
  addToCart,
  removeFromCart,
  setProducts,
  updateCartQuantity,
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;
