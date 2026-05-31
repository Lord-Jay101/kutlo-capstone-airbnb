import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../auth/AuthContext';
import Logo from '../assets/airbnb-logo.png';

const AdminLogin = () => {
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
        role: 'host',
      });

      const user = res.data.user;

      if (user.role !== 'host' && user.role !== 'admin') {
        setError(
          'Access denied. Only hosts can access the dashboard.'
        );
        return;
      }

      login(res.data.user, res.data.token);

      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Invalid username or password'
      );
    }
  };

  return (
    <>
      <div className="admin-login-container">
        <div className="admin-login-box">

          {/* Logo */}
          <div className="logo-container">
            <img
              src={Logo}
              alt="Airbnb Logo"
              className="logo"
            />
          </div>

          {/* Title */}
          <h1 className="admin-login-title">
            Host Dashboard
          </h1>

          <p className="admin-login-subtitle">
            Login to manage your listings,
            reservations, and guests.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="admin-login-form"
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
              className="admin-login-button"
            >
              Login to Dashboard
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

        .admin-login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f7f7f7;
          padding: 20px;
        }

        .admin-login-box {
          width: 100%;
          max-width: 420px;
          background: white;
          padding: 40px;
          border-radius: 14px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
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

        .admin-login-title {
          text-align: center;
          font-size: 30px;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
        }

        .admin-login-subtitle {
          text-align: center;
          font-size: 14px;
          color: #717171;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .admin-login-form {
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
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #ff385c;
          box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.15);
        }

        .admin-login-button {
          width: 100%;
          padding: 14px;
          background-color: #ff385c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .admin-login-button:hover {
          background-color: #e03150;
        }

        .error-message {
          color: #ff385c;
          font-size: 14px;
          margin-bottom: 16px;
          text-align: center;
        }

        @media (max-width: 480px) {
          .admin-login-box {
            padding: 30px 20px;
          }

          .admin-login-title {
            font-size: 26px;
          }

          .logo {
            width: 100px;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLogin;