

import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login', login);

      // Save token & user info in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Login</h2>

      <div className="input-container">
        <label>Email</label>
        <input type="text" onChange={(e) => onChange(e, 'email')} />
      </div>

      <div className="input-container">
        <label>Password</label>
        <input type="password" onChange={(e) => onChange(e, 'password')} />
      </div>
      <div style={{ marginTop: '.4rem' }}>
  <Link to="/forgot-password">Forgot password?</Link>
</div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;