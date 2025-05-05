import React, { useState } from 'react';
import ProductManagement from './ProductManagement';  // Import component quản lý sản phẩm
import UserManagement from './UserManagement';  // Import component quản lý người dùng
import './AdminDashboard.css';

const AdminDashboard = () => {
  // State để điều khiển việc hiển thị phần quản lý sản phẩm và người dùng
  const [activeSection, setActiveSection] = useState('products');  // Default hiển thị quản lý sản phẩm
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>
            <button onClick={() => setActiveSection('products')}>Quản lý sản phẩm</button>
          </li>
          <li>
            <button onClick={() => setActiveSection('users')}>Quản lý người dùng</button>
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="content">
        <div className='text16'>
          Admin Dashboard
        </div>
        {/* Điều khiển hiển thị theo activeSection */}
        {activeSection === 'products' && <ProductManagement />}
        {activeSection === 'users' && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
