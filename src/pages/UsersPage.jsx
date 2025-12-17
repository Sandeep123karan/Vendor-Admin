



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserBox() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:7002/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading user info...</p>;

  return (
    <div style={{ width: "95%", maxWidth: 700, margin: "30px auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ background: "#f8f9fa" }}>
            
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            
            <td style={tdStyle}>{user.email}</td>
            <td style={{ ...tdStyle, fontWeight: 600, color: "#007bff" }}>
              {user.role}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "600",
  fontSize: 15,
};

const tdStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #eee",
  fontSize: 14,
};
