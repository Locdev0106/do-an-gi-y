import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null, // Xác định nếu người dùng có quyền admin
  users: [
    { id: 1, username: "admin", email: "admin@example.com", password: "Admin1234", role: "admin" },  // Admin mặc định
    { id: 2, username: "user1", email: "user1@example.com", password: "User1234", role: "user" },
    { id: 3, username: "Hoàng Vũ", email: "hoangvu160605@gmail.com", password: "Hoangvu1606", role: "user" },
    // Thêm người dùng mẫu ở đây
  ],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
    
      // Tìm kiếm người dùng từ danh sách users
      const user = state.users.find(user => user.email === email && user.password === password);
      
      if (user) {
        state.isLoggedIn = true;
        state.user = user;
        state.isAdmin = user.role === "admin";
      } else {
        state.isLoggedIn = false;
        state.user = null;
        state.isAdmin = false;
      }
    },
    
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAdmin = false;
    },
    addUser: (state, action) => {
      state.users.push(action.payload); // Thêm người dùng mới
    },
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData }; // Cập nhật thông tin người dùng
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload); // Xóa người dùng
    },
  },
});

export const { login, logout, addUser, updateUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
