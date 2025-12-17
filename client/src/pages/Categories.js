

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);

  // 🔥 Toggle for form (show/hide)
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7002/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Name is required!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:7002/api/categories/${editId}`,
          formData
        );

        setEditId(null);
      } else {
        await axios.post("http://localhost:7002/api/categories", formData);
      }

      // Clear
      setName("");
      setDescription("");
      setImage(null);
      setImagePreview(null);

      fetchCategories();
      setShowForm(false); // auto close form

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description);
    setImagePreview(cat.image);

    setShowForm(true); // open form on edit
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:7002/api/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="cat-container">
      <h1 className="title">Manage Categories</h1>

      {/* 🔥 Add Button Top Right */}
      <button
        className="btn-add-toggle"
        onClick={() => {
          setShowForm(!showForm);
          setEditId(null);
          setName("");
          setDescription("");
          setImage(null);
          setImagePreview(null);
        }}
      >
        {showForm ? "Close Form" : "Add Category"}
      </button>

      {/* 🔥 Show/Hide Form */}
      {showForm && (
        <div className="form-card">
          <h3>{editId ? "Update Category" : "Add New Category"}</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {imagePreview && (
              <img
                className="preview-img"
                src={imagePreview}
                alt="preview"
              />
            )}

            <button type="submit" className="btn-submit">
              {editId ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
      )}

      {/* 🔥 Table */}
      <table className="cat-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.description}</td>

              <td>
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="table-img"
                  />
                )}
              </td>

              <td className="actions-col">
                <button className="btn-edit" onClick={() => handleEdit(cat)}>
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

