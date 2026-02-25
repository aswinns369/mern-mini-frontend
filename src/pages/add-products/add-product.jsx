
 
import './add-product.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      navigate('/');
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-add-form">
        <h2>Add Product</h2>
        <div className="input-container"><label>Name</label>
          <input type="text" value={product.name} onChange={(e) => onChange(e, "name")} placeholder="Enter product name" />
        </div>
        <div className="input-container"><label>Price</label>
          <input type="number" value={product.price} onChange={(e) => onChange(e, "price")} placeholder="Enter product price" />
        </div>
        <div className="input-container"><label>Category</label>
          <select value={product.category} onChange={(e)=> onChange(e, 'category')}>
            {CATEGORY_OPTIONS.map(c=> <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="input-container"><label>Stock</label>
          <input type="number" min="0" value={product.stock} onChange={(e)=> onChange(e, 'stock')} />
        </div>
        <div className="input-container"><label>Description</label>
          <textarea value={product.description} onChange={(e) => onChange(e, "description")} placeholder="Enter product description" />
        </div>
        <div className="input-container"><label>Image</label>
          <input type="file" onChange={onFileChange} />
        </div>
        {product.imageFile && (
          <div className="image-preview"><p>Preview:</p>
            <img src={URL.createObjectURL(product.imageFile)} alt="preview" width="150" />
          </div>
        )}
        <button className="add-btn" onClick={onAddProduct}>Add Product</button>
      </div>
    </>
  );
};

export default AddProduct;