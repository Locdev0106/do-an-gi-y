import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  // Kiểm tra xem người dùng đã đăng nhập và có quyền admin hay không
  if (!isLoggedIn) {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    return <Navigate to="/dangnhap" />;
  }

  if (!isAdmin) {
    // Nếu người dùng không phải là admin, chuyển hướng về trang chủ (hoặc trang khác nếu cần)
    return <Navigate to="/" />;
  }

  // Nếu người dùng đã đăng nhập và có quyền admin, render component
  return <Component />;
};

export default PrivateRoute;
