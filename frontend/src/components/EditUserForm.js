// src/components/EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditUserForm = ({ user, onClose, fetchUsers }) => {
  const token = useSelector((state) => state.user.token);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response", response)
        const { firstName, lastName, email, role } = response.data;
        setFormData({ firstName, lastName, email, role });
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error (show error message, etc.)
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal or navigate away without saving changes
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
