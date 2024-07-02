// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../store/userSlice';
import UserTable from '../components/UserTable';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>
      <main className="flex-grow p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by email..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <UserTable users={filteredUsers}  fetchUsers/>
      </main>
    </div>
  );
};

export default Dashboard;
