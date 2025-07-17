import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [agree, setAgree] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let responseData;
    await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors || responseData.error);
    }
  };

  const handleSignupOtpSend = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    if (!agree) {
      alert("Please agree to the terms of use & privacy policy.");
      return;
    }

    alert("Sending OTP to your email...");

    const response = await fetch(`${BASE_URL}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email }),
    });

    const data = await response.json();

    if (data.success) {
      alert("OTP sent successfully!");
      navigate('/verify', {
        state: {
          name: formData.username,
          email: formData.email,
          password: formData.password
        }
      });
    } else {
      alert("Failed to send OTP. Try again.");
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-feilds">
          {state === "Sign Up" && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Your Name'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>

        {state === "Login" && (
          <div style={{ textAlign: 'right', marginTop: '5px' }}>
            <span
              style={{ color: '#ff4141', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => navigate('/forgotpassword')}
            >
              Forgot Password?
            </span>
          </div>
        )}

        {state === "Sign Up" && (
          <div className="loginsignup-agree" style={{ marginTop: '20px' }}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <button
          onClick={() => {
            if (state === "Login") {
              login();
            } else {
              handleSignupOtpSend();
            }
          }}
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account? <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
