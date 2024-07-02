// src/components/Navbar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../store/userSlice';

const Navbar = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl">Admin Panel</h1>
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
