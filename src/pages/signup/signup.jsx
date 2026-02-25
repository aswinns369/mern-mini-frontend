

import './signup.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const onChange = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
  };

  const onAddSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/signup', signup);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('Signup successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Signup</h2>

      <div className="input-container">
        <label>Name</label>
        <input type="text" onChange={(e) => onChange(e, 'name')} />
      </div>

      <div className="input-container">
        <label>Email</label>
        <input type="text" onChange={(e) => onChange(e, 'email')} />
      </div>

      <div className="input-container">
        <label>Password</label>
        <input type="password" onChange={(e) => onChange(e, 'password')} />
      </div>

      <div className="input-container">
        <label>Confirm Password</label>
        <input type="password" onChange={(e) => onChange(e, 'confirmpassword')} />
      </div>

      <button onClick={onAddSignup}>Signup</button>
    </div>
  );
};

export default Signup;