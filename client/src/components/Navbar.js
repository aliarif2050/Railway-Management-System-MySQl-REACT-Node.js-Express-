import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Train Management System</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Search Trains</Link>
          {user ? (
            <>
              <Link to="/my-bookings" className="hover:text-blue-200">My Bookings</Link>
              <span className="font-semibold">Hello, {user.Name}</span>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;