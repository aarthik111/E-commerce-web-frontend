import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleReset = async () => {
    setError(null);
    setMessage(null);

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!strongPassword.test(newPassword)) {
      setError("Password must have at least one capital letter, one number, one special character, and be 6+ characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password updated successfully!");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || "Reset link expired or invalid.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Reset Password</h1>

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}

        <div className="loginsignup-feilds">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button onClick={handleReset} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p className="loginsignup-login">
          Back to? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
