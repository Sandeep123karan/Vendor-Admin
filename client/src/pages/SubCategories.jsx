






import React, { useEffect, useState } from "react";
import axios from "axios";
import SubCategories from "./SubCategories.jsx";



export default function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7002/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("http://localhost:7002/api/subcategories");
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !parent) return alert("Name and category are required!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent", parent);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:7002/api/subcategories/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditId(null);
      } else {
        await axios.post("http://localhost:7002/api/subcategories", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setName("");
      setParent("");
      setImage(null);
      setShowForm(false);
      fetchSubcategories();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (sub) => {
    setEditId(sub._id);
    setName(sub.name);
    setParent(sub.parent._id);
    setShowForm(true);
    <td>{sub.parent ? sub.parent.name : "No Category"}</td>

  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:7002/api/subcategories/${id}`);
      fetchSubcategories();
    }
  };

  return (
    <div className="subcat-container">
      <h1>Manage SubCategories</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditId(null);
          setName("");
          setParent("");
          setImage(null);
        }}
      >
        {showForm ? "Close Form" : "Add SubCategory"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card" encType="multipart/form-data">
          <select value={parent} onChange={(e) => setParent(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="SubCategory Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit">{editId ? "Update" : "Add"} SubCategory</button>
        </form>
      )}

      <table className="subcat-table">
        <thead>
          <tr>
            <th> subcategory Name</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub) => (
            <tr key={sub._id}>
              <td>{sub.name}</td>
              <td>{sub.parent?.name}</td>
              <td>
                {sub.image && (
                  <img src={`http://localhost:700${sub.image}`} alt={sub.name} width="50" />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(sub)}>Edit</button>
                <button onClick={() => handleDelete(sub._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
