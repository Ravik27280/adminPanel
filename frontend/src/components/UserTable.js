// src/components/UserTable.js
import React, { useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";
import { useSelector } from "react-redux";

const UserTable = ({ users, fetchUsers }) => {
  const [editUser, setEditUser] = useState(null);
  const token = useSelector((state) => state.user.token);


  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get('/api/users', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUsers(res.data);
  //     setFilteredUsers(res.data);
  //   } catch (err) {
  //     console.error('Error fetching users:', err);
  //   }
  // };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        users(); // Refresh the user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        // Handle error (show error message, etc.)
      }
    }
  };
  console.log("edit user",editUser);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">First Name</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Last Name</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Email</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Role</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border py-2 px-4">{user.firstName}</td>
              <td className="border py-2 px-4">{user.lastName}</td>
              <td className="border py-2 px-4">{user.email}</td>
              <td className="border py-2 px-4">{user.role}</td>
              <td className="border py-2 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <EditUserForm
              users={users}
              user={editUser}
              onClose={handleCancelEdit}
              fetchUsers={fetchUsers}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
