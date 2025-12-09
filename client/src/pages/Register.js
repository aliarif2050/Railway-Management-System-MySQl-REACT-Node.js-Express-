import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', city: '', cnic: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', form);
      alert("Registration Successful");
      navigate('/login');
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Full Name" className="w-full border p-2 rounded" 
           onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="City" className="w-full border p-2 rounded" 
           onChange={e => setForm({...form, city: e.target.value})} />
        <input placeholder="CNIC Number" className="w-full border p-2 rounded" 
           onChange={e => setForm({...form, cnic: e.target.value})} />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" 
           onChange={e => setForm({...form, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}

export default Register;