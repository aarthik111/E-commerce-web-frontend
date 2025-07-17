import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, password } = location.state || {};

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // 15-minute OTP expiry auto-redirect
  useEffect(() => {
    const expiryRedirect = setTimeout(() => {
      alert("OTP expired. Please sign up again.");
      navigate('/signup');
    }, 15 * 60 * 1000);
    return () => clearTimeout(expiryRedirect);
  }, [navigate]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Validate required info on mount
  useEffect(() => {
    if (!email || !name || !password) {
      alert("Missing signup info.");
      navigate('/signup');
    }
  }, [email, name, password, navigate]);

  const handleVerify = async () => {
    if (!otp.trim()) {
      showAlert("Please enter the OTP", "error");
      return;
    }

    showAlert("Verifying OTP...", "success");

    try {
      const response = await fetch(`${BASE_URL}/verify-otp-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert("OTP verified! Redirecting...", "success");
        localStorage.setItem('auth-token', data.token);
        setTimeout(() => navigate('/'), 1500);
      } else {
        showAlert(data.message || "OTP verification failed.", "error");
      }
    } catch (err) {
      showAlert("Server error. Try again later.", "error");
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      const response = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResendTimer(60);
      showAlert(data.success ? "OTP resent successfully." : "Failed to resend OTP.", data.success ? "success" : "error");
    } catch (err) {
      showAlert("Error resending OTP", "error");
    }
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Verify OTP</h1>
        <div className="loginsignup-feilds">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button onClick={handleVerify}>Verify</button>

        <p className="loginsignup-login" style={{ marginTop: '20px' }}>
          Didn’t get OTP?&nbsp;
          <span
            onClick={handleResendOtp}
            style={{
              color: resendTimer > 0 ? '#999' : '#ff4141',
              cursor: resendTimer > 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Resend OTP {resendTimer > 0 ? `in ${resendTimer}s` : ''}
          </span>
        </p>

        {alertMessage && (
          <p
            className="loginsignup-login"
            style={{
              color: alertType === 'success' ? 'green' : 'red',
              transition: 'opacity 0.5s ease-in-out',
              opacity: alertMessage ? 1 : 0
            }}
          >
            {alertMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Verify;
