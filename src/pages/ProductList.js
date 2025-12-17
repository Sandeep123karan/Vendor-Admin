


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/ProductList.css";




const API = axios.create({ baseURL: "http://localhost:7002/api/products" });

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");

  // Form fields
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [quality, setQuality] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  // Load Categories + SubCategories
  useEffect(() => {
    const fetchData = async () => {
      const c1 = await axios.get("http://localhost:7002/api/categories");
      const c2 = await axios.get("http://localhost:7002/api/subcategories");
      setCategories(c1.data);
      setSubCategories(c2.data);
    };
    fetchData();
  }, []);

  // Load products
  const loadProducts = async () => {
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
    loadProducts();
  }, [page, search, sort, categoryFilter, subCategoryFilter]);

  // Handle file selection
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

  // SAVE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("name", name);
    fd.append("description", description);
    fd.append("restaurantName", restaurantName);
    fd.append("oldPrice", oldPrice);
    fd.append("newPrice", newPrice);
    fd.append("quality", quality);
    fd.append("stock", stock);
    fd.append("category", category);
    fd.append("subcategory", subcategory);

    if (image) fd.append("image", image);
    if (logo) fd.append("logo", logo);

    if (editingId) {
      await API.put(`/${editingId}`, fd);
    } else {
      await API.post("/", fd);
    }

    resetForm();
    loadProducts();
  };

  // RESET FORM
  const resetForm = () => {
    setName("");
    setDescription("");
    setRestaurantName("");
    setOldPrice("");
    setNewPrice("");
    setQuality("");
    setStock("");
    setCategory("");
    setSubCategory("");
    setImage(null);
    setLogo(null);
    setPreviewImage(null);
    setPreviewLogo(null);
    setEditingId(null);
    setShowForm(false);
  };

  // EDIT PRODUCT
  const handleEdit = (p) => {
    setShowForm(true);
    setEditingId(p._id);

    setName(p.name);
    setDescription(p.description);
    setRestaurantName(p.restaurantName);
    setOldPrice(p.oldPrice);
    setNewPrice(p.newPrice);
    setQuality(p.quality);
    setStock(p.stock);
    setCategory(p.category?._id);
    setSubCategory(p.subcategory?._id);

    setPreviewImage(p.image);
    setPreviewLogo(p.logo);
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await API.delete(`/${id}`);
    loadProducts();
  };

  return (
    <div className="product-list-page">

      <h1>Product List</h1>

      {/* <button className="btn add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Product"}
      </button> */}

      {/* SEARCH + FILTER BAR */}
      <div className="filters">
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select value={subCategoryFilter} onChange={(e) => setSubCategoryFilter(e.target.value)}>
          <option value="">SubCategory</option>
          {subCategories.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* PRODUCT FORM */}
      {showForm && (
        <form className="product-form" onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input placeholder="Restaurant Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />

          <input type="number" placeholder="Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
          <input type="number" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />

          <input placeholder="Quality" value={quality} onChange={(e) => setQuality(e.target.value)} />
          <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
          </select>

          <select value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="">SubCategory</option>
            {subCategories.map((s) => (<option key={s._id} value={s._id}>{s.name}</option>))}
          </select>

          {/* Image */}
          <label>Product Image</label>
          <input type="file" onChange={handleImage} />
          {previewImage && <img src={previewImage} className="preview-img" alt="" />}

          {/* Logo */}
          <label>Logo</label>
          <input type="file" onChange={handleLogo} />
          {previewLogo && <img src={previewLogo} className="preview-img" alt="" />}

          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>
      )}

      {/* PRODUCTS TABLE */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Restaurant</th>
            <th>Price</th>
            <th>Quality</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.image ? <img src={p.image} className="list-img" /> : "—"}</td>
              <td>{p.logo ? <img src={p.logo} className="list-img" /> : "—"}</td>
              <td>{p.name}</td>
              <td>{p.restaurantName}</td>
              <td>₹{p.newPrice}</td>
              <td>{p.quality}</td>
              <td>{p.category?.name}</td>
              <td>{p.subcategory?.name}</td>

              <td>
                <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </div>
  );
}
