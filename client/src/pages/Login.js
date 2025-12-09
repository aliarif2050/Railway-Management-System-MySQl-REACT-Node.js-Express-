import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [form, setForm] = useState({ cnic: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      onLogin(res.data);
      navigate('/');
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="CNIC Number" className="w-full border p-2 rounded" 
           onChange={e => setForm({...form, cnic: e.target.value})} />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" 
           onChange={e => setForm({...form, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}

export default Login;