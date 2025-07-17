import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null); // ✅ For success message
  const [error, setError] = useState(null);     // ✅ For error message
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Email not registered.");
      } else {
        setMessage("Reset password link sent to your email.");
        setTimeout(() => navigate('/login'), 2000); // Navigate after 2 seconds
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Forgot Password</h1>

        {/* ✅ Alert Messages */}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}

        <div className="loginsignup-feilds">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} disabled={sending}>
          {sending ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="loginsignup-login">
          Go back to? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
