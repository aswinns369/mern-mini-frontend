// src/pages/add-products/add-product.jsx
import './add-product.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';

const CATEGORY_OPTIONS = ['Electronics','Clothing','Home','Books','Sports','Beauty','Grocery','Toys'];

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: CATEGORY_OPTIONS[0],
    stock: 1,
    Image: "",
    imageFile: null,
  });

  const token = localStorage.getItem('token');

  const onChange = (e, key) => setProduct({ ...product, [key]: e.target.value });
  const onFileChange = (e) => setProduct({ ...product, imageFile: e.target.files[0] });

  const onAddProduct = async () => {
    if (!token) { toast.error('You must be logged in to add a product'); return; }
    try {
      let imageUrl = product.Image;

      if (product.imageFile) {
        const formData = new FormData();
        formData.append("img", product.imageFile);
        const uploadRes = await axios.post("http://localhost:8000/upload-image", formData, { headers: { "Content-Type": "multipart/form-data" } });
        imageUrl = uploadRes.data.url;
      }

      const finalProduct = {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: Number(product.stock || 0),
        Image: imageUrl,
      };

      await axios.post("http://localhost:8000/product", finalProduct, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Product added successfully!");
      navigate('/my-products');
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="add-product-container">
         <div className="add-product-banner">
            <h2>Turn your unused items into cash</h2>
            <p>Sell anything in minutes. Start earning today.</p>
         </div>

        <div className="product-add-form">
          <h3>Product Details</h3>
          
          <div className="input-row">
             <div className="input-container flex-2">
               <label>Title</label>
               <input type="text" value={product.name} onChange={(e) => onChange(e, "name")} placeholder="e.g. Vintage Denim Jacket" />
             </div>
             <div className="input-container flex-1">
               <label>Price (Rs.)</label>
               <input type="number" value={product.price} onChange={(e) => onChange(e, "price")} placeholder="0.00" />
             </div>
          </div>
          
          <div className="input-row">
             <div className="input-container flex-1">
               <label>Category</label>
               <select value={product.category} onChange={(e)=> onChange(e, 'category')}>
                 {CATEGORY_OPTIONS.map(c=> <option key={c}>{c}</option>)}
               </select>
             </div>
             <div className="input-container flex-1">
               <label>Initial Stock</label>
               <input type="number" min="0" value={product.stock} onChange={(e)=> onChange(e, 'stock')} />
             </div>
          </div>
          
          <div className="input-container">
             <label>Description</label>
             <textarea rows="4" value={product.description} onChange={(e) => onChange(e, "description")} placeholder="Describe your item, its condition, and any important details." />
          </div>

          <div className="input-container">
             <label>Product Image</label>
             <div className="file-upload-box">
               <input type="file" onChange={onFileChange} className="file-input" />
               <div className="upload-prompt">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span>Click to select image</span>
               </div>
             </div>
          </div>
          
          {product.imageFile && (
            <div className="image-preview">
              <label>Preview</label>
              <img src={URL.createObjectURL(product.imageFile)} alt="preview" />
            </div>
          )}
          
          <div className="form-actions">
             <button className="add-btn" onClick={onAddProduct}>LIST ITEM FOR SALE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;