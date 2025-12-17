





import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProductPage.css";

const API = axios.create({ baseURL: "http://localhost:7002/api/products" });

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [quality, setQuality] = useState("");
  const [addToCart, setAddToCart] = useState(false);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch categories & subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:7002/api/categories");
      setCategories(res.data);
    };
    const fetchSubCategories = async () => {
      const res = await axios.get("http://localhost:7002/api/subcategories");
      setSubCategories(res.data);
    };
    fetchCategories();
    fetchSubCategories();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    const params = {
      page,
      limit: 10,
      search,
      sort,
      category: categoryFilter,
      subcategory: subCategoryFilter,
    };
    const res = await API.get("/", { params });
    setProducts(res.data.products);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, sort, categoryFilter, subCategoryFilter]);

  // Handle image/logo selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  const handleLogo = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreviewLogo(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("restaurantName", restaurantName);
    fd.append("oldPrice", oldPrice);
    fd.append("newPrice", newPrice);
    fd.append("quality", quality);
    fd.append("addToCart", addToCart);
    fd.append("stock", stock);
    fd.append("category", category);
    fd.append("subcategory", subcategory);
    if (image) fd.append("image", image);
    if (logo) fd.append("logo", logo);

    try {
      if (editingId) {
        await API.put(`/${editingId}`, fd);
      } else {
        await API.post("/", fd);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product!");
    }
  };

  const resetForm = () => {
    setName(""); setDescription(""); setRestaurantName(""); setOldPrice(""); setNewPrice("");
    setQuality(""); setAddToCart(false); setStock(""); setCategory(""); setSubCategory("");
    setImage(null); setLogo(null); setPreviewImage(null); setPreviewLogo(null);
    setEditingId(null); setShowForm(false);
  };

  // Edit/Delete
  const handleEdit = (p) => {
    setEditingId(p._id);
    setShowForm(true);
    setName(p.name); setDescription(p.description); setRestaurantName(p.restaurantName);
    setOldPrice(p.oldPrice); setNewPrice(p.newPrice); setQuality(p.quality);
    setAddToCart(p.addToCart); setStock(p.stock); setCategory(p.category?._id);
    setSubCategory(p.subcategory?._id); setPreviewImage(p.image); setPreviewLogo(p.logo);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await API.delete(`/${id}`);
    fetchProducts();
  };

  // CSV Export
  const handleExportCSV = async () => {
    try {
      const res = await API.get("/export/csv", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to export CSV");
    }
  };

  // CSV Import
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:7002/api/products/import", formData);
      alert("CSV Imported Successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("CSV Import Failed!");
    }
  };

  return (
    <div className="admin-container">
      {/* Top Buttons */}
      <div className="top-buttons">
        <button className="btn add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Product"}
        </button>
        <button className="btn export-btn" onClick={handleExportCSV}>Export CSV</button>

        {/* Import CSV Button */}
        <label htmlFor="csvInput" className="btn import-btn blue-btn">
          Import CSV
        </label>
        <input
          type="file"
          id="csvInput"
          accept=".csv"
          onChange={handleCSVUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select value={subCategoryFilter} onChange={(e) => setSubCategoryFilter(e.target.value)}>
          <option value="">All SubCategories</option>
          {subCategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </div>

      {/* Product Form */}
      {showForm && (
        <form className="product-form" onSubmit={handleSubmit}>
          <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input placeholder="Brand Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
          <input type="number" placeholder="Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
          <input type="number" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
          <select value={quality} onChange={(e) => setQuality(e.target.value)} required>
            <option value="">Select Quality</option>
            <option value="Fresh">Fresh</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          <select value={addToCart} onChange={(e) => setAddToCart(e.target.value === "true")}>
            <option value="false">Disable Add to Cart</option>
            <option value="true">Enable Add to Cart</option>
          </select>
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="">Select SubCategory</option>
            {subCategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImage} />
          {previewImage && <img src={previewImage} className="preview-img" />}
          <label>Logo:</label>
          <input type="file" accept="image/*" onChange={handleLogo} />
          {previewLogo && <img src={previewLogo} className="preview-img" />}
          <button type="submit" className="btn add-btn">{editingId ? "Update Product" : "Add Product"}</button>
        </form>
      )}

      {/* Products Table */}
      <h2 className="title">Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th><th>Logo</th><th>Name</th><th>Brand</th>
            <th>Old Price</th><th>New Price</th><th>Quality</th><th>Category</th>
            <th>SubCategory</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.image ? <img src={p.image} className="list-img"/> : "No Image"}</td>
              <td>{p.logo ? <img src={p.logo} className="list-img"/> : "No Logo"}</td>
              <td>{p.name}</td>
              <td>{p.restaurantName}</td>
              <td>{p.oldPrice}</td>
              <td>{p.newPrice}</td>
              <td>{p.quality}</td>
              <td>{p.category?.name}</td>
              <td>{p.subcategory?.name}</td>
              <td className="action-buttons">
                <button className="btn edit" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
