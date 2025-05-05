import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Thư viện lưu trữ (localStorage)
import productReducer from "../features/product/productSlice"; // Reducer cho sản phẩm
import authReducer from "../features/auth/authSlice"; // Reducer cho thông tin xác thực người dùng

// Cấu hình cho Redux Persist
const persistConfig = {
  key: "root", 
  storage, 
};

// Tạo rootReducer để kết hợp các reducer
const rootReducer = {
  product: persistReducer(persistConfig, productReducer), 
  auth: authReducer, // authReducer cho thông tin người dùng
};


const store = configureStore({
  reducer: rootReducer,
});


const persistor = persistStore(store);

export { store, persistor };
