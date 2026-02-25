import './forgot-reset.css';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) return toast.error('Enter your email');
    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8000/users/forgot-password',
        { email }
      );
      toast.success(
        res.data.message || 'If that email exists, a reset link has been sent'
      );
      setEmail('');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-card">
        <ToastContainer />
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a reset link.</p>
        <div className="input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <button onClick={submit} disabled={loading}>
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
