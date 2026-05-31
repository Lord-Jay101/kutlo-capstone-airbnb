import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../auth/AuthContext';
import Logo from '../assets/airbnb-logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const res = await api.post('/users/login', {
        username,
        password,
        role: 'user',
      });

      login(res.data.user, res.data.token);

      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid credentials'
      );
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          {/* Logo */}
          <div className="logo-container">
            <img
              src={Logo}
              alt="Airbnb Logo"
              className="logo"
            />
          </div>

          {/* Heading */}
          <h1 className="login-title">
            Welcome Back
          </h1>

          <p className="login-subtitle">
            Login to continue to Airbnb Clone
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            {/* Username */}
            <div className="form-group">
              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                className="form-input"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="form-input"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f7f7f7;
          padding: 20px;
        }

        .login-box {
          background: white;
          width: 100%;
          max-width: 420px;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .logo {
          width: 120px;
          object-fit: contain;
        }

        .login-title {
          text-align: center;
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #222;
        }

        .login-subtitle {
          text-align: center;
          color: #717171;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #444;
        }

        .form-input {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #ff385c;
          box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.15);
        }

        .login-button {
          width: 100%;
          padding: 14px;
          background-color: #ff385c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .login-button:hover {
          background-color: #e03150;
        }

        .error-message {
          color: #ff385c;
          font-size: 14px;
          margin-bottom: 15px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px 20px;
          }

          .login-title {
            font-size: 28px;
          }

          .logo {
            width: 100px;
          }
        }
      `}</style>
    </>
  );
};

export default Login;