
import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/2.png";

// import logo from "../components/assets/2.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7002/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/adminlayout"; // keep your API redirect
    } catch (e) {
      alert(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="right">
        <form className="form" onSubmit={submit}>
          <h2 className="title">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
          {/* <p className="signup-text">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
          <p className="signup-text">
  Are you a vendor? <a href="/vendorlogin">Vendor Login</a>
</p> */}
<p className="signup-text">
  Don't have an account? <a href="/signup">Signup</a>
</p>
<p className="signup-text">
  Are you a vendor? <a href="/vendorlogin">Vendor Login</a>
</p>


  

        </form>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: "Segoe UI", sans-serif;
        }

        .container {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
          width: 100%;
          background: #fff;
        }

        .left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ff4d4d;
        }

        .logo-image {
          max-width: 80%;
          max-height: 80%;
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
          margin-bottom: 30px;
          font-size: 26px;
          color: #ff4d4d;
        }

        input {
          width: 100%;
          padding: 14px 15px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          outline: none;
          font-size: 16px;
          transition: 0.3s;
        }

        input:focus {
          border-color: #ff4d4d;
          box-shadow: 0 0 5px rgba(255, 77, 77, 0.5);
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

        .signup-text {
          margin-top: 15px;
          font-size: 14px;
          color: #333;
        }

        .signup-text a {
          color: #ff4d4d;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-text a:hover {
          text-decoration: underline;
        }

        /* Mobile Responsive */
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
