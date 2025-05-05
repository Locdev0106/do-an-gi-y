import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, removeUser } from "../features/auth/authSlice";
import './UserManagement.css'; // Import CSS cho User Management

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const [newUser, setNewUser] = useState({ username: "", email: "", role: "user" });
  const [editUser, setEditUser] = useState(null);

  // Thêm người dùng mới
  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setNewUser({ username: "", email: "", role: "user" });
  };

  // Cập nhật người dùng
  const handleUpdateUser = () => {
    if (editUser) {
      dispatch(updateUser({ id: editUser.id, updatedData: editUser }));
      setEditUser(null);  
    }
  };

  // Xóa người dùng
  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <div className="user-management-container">
      <h2 className="title">Quản lý người dùng</h2>
      
      <div className="form-container">
        <h3>Thêm người dùng mới</h3>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="input-field"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="input-field"
        >
          <option value="user">Người dùng</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser} className="btn-add">Thêm người dùng</button>
      </div>

      <h3 className="user-list-title">Danh sách người dùng</h3>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.username} - {user.email} - {user.role}
            <div className="user-actions">
              <button onClick={() => setEditUser(user)} className="btn-edit">Sửa</button>
              <button onClick={() => handleRemoveUser(user.id)} className="btn-remove">Xóa</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form sửa người dùng */}
      {editUser && (
        <div className="edit-form-container">
          <h3>Sửa người dùng</h3>
          <input
            type="text"
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
            className="input-field"
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            className="input-field"
          />
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            className="input-field"
          >
            <option value="user">Người dùng</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleUpdateUser} className="btn-update">Cập nhật</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
