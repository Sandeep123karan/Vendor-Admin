
import React, { useState } from "react";
import axios from "axios";
import logo from "../components/assets/2.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7002/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (e) {
      alert(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="right">
        <form className="form" onSubmit={submit}>
          <h2 className="title">Create Admin Account</h2>

          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
          

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
          
        </form>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Segoe UI", sans-serif;
        }

        html,
        body,
        #root {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .container {
          display: flex;
          min-height: 100vh;
          width: 100%;
          flex-direction: row;
        }

        .left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff4d4d;
        }

        .logo-image {
          max-width: 70%;
          max-height: 70%;
          object-fit: contain;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          background: #fff;
        }

        .form {
          width: 100%;
          max-width: 400px;
          background: #fff;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .title {
          color: #ff4d4d;
          font-size: 26px;
          margin-bottom: 30px;
        }

        .input-group {
          position: relative;
          margin-bottom: 25px;
        }

        .input-group input {
          width: 100%;
          padding: 14px 15px;
          border: 1px solid #ccc;
          border-radius: 10px;
          outline: none;
          font-size: 16px;
          transition: 0.3s;
        }

        .input-group input:focus {
          border-color: #ff4d4d;
          box-shadow: 0 0 5px rgba(255, 77, 77, 0.5);
        }

        .input-group label {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #aaa;
          font-size: 14px;
          pointer-events: none;
          transition: 0.3s;
        }

        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
          top: -10px;
          font-size: 12px;
          color: #ff4d4d;
          background: #fff;
          padding: 0 5px;
        }

        .btn {
          width: 100%;
          padding: 14px 0;
          background: #ff4d4d;
          border: none;
          border-radius: 25px;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255, 77, 77, 0.3);
          transition: 0.3s;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(255, 77, 77, 0.5);
        }

        .login-link {
          margin-top: 15px;
          font-size: 14px;
        }

        .login-link a {
          color: #ff4d4d;
          text-decoration: none;
          font-weight: 500;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .left {
            width: 100%;
            height: 50vh;
          }
          .right {
            width: 100%;
            height: 50vh;
            padding: 30px 20px;
          }
          .form {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
