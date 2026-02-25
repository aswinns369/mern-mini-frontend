import './forgot-reset.css';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password || !confirmPassword) return toast.error('Fill both fields');
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters');
    if (password !== confirmPassword)
      return toast.error('Passwords do not match');

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8000/users/reset-password',
        { token, password, confirmPassword }
      );
      toast.success(res.data.message || 'Password reset successful');
      setTimeout(() => navigate('/login'), 1200);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-card">
        <ToastContainer />
        <h2>Set New Password</h2>
        <div className="input">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={submit} disabled={loading}>
          {loading ? 'Saving…' : 'Reset Password'}
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
