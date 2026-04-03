import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar/Navbar';

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
    <>
      <Navbar />
      <div className="login-container">
        <ToastContainer />
        <h2>Login to your account</h2>

        <div className="input-container">
          <label>Email ID</label>
          <input type="text" onChange={(e) => onChange(e, 'email')} />
        </div>

        <div className="input-container">
          <label>Password</label>
          <input type="password" onChange={(e) => onChange(e, 'password')} />
        </div>
        
        <div style={{ marginTop: '.4rem', marginBottom: '1rem' }}>
           <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        </div>

        <button className="auth-btn" onClick={handleLogin}>LOGIN</button>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
           New to Minizon? <Link to="/signup" className="forgot-link">Create an account</Link>
        </div>
      </div>
    </>
  );
};

export default Login;