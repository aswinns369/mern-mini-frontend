
import './EditProduct.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar/Navbar';

const CATEGORY_OPTIONS = [
  'Electronics',
  'Clothing',
  'Home',
  'Books',
  'Sports',
  'Beauty',
  'Grocery',
  'Toys',
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    Image: '',
    imageFile: null,
    category: 'Electronics',
    stock: 1,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/product/${id}`);
        setProduct(p => ({ ...p, ...res.data }));
      } catch (error) {
        toast.error('Failed to load product details');
      }
    };
    fetchProduct();
  }, [id]);

  const onChange = (e, key) =>
    setProduct({ ...product, [key]: e.target.value });
  const onFileChange = e =>
    setProduct({ ...product, imageFile: e.target.files[0] });

  const onUpdateProduct = async () => {
    if (!token) {
      toast.error('You must be logged in to edit a product');
      return;
    }
    try {
      let imageUrl = product.Image;
      if (product.imageFile) {
        const formData = new FormData();
        formData.append('img', product.imageFile);
        const uploadRes = await axios.post(
          'http://localhost:8000/upload-image',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        imageUrl = uploadRes.data.url;
      }

      const updatedProduct = {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: Number(product.stock || 0),
        Image: imageUrl,
      };

      await axios.patch(`http://localhost:8000/product/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product updated successfully!');
      setTimeout(() => navigate('/'), 1200);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-form">
        <ToastContainer />
        <h2>Edit Product</h2>
        <div className="input-container">
          <label>Name</label>
          <input
            type="text"
            value={product.name}
            onChange={e => onChange(e, 'name')}
          />
        </div>
        <div className="input-container">
          <label>Price</label>
          <input
            type="number"
            value={product.price}
            onChange={e => onChange(e, 'price')}
          />
        </div>
        <div className="input-container">
          <label>Category</label>
          <select
            value={product.category}
            onChange={e => onChange(e, 'category')}
          >
            {CATEGORY_OPTIONS.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label>Stock</label>
          <input
            type="number"
            min="0"
            value={product.stock}
            onChange={e => onChange(e, 'stock')}
          />
        </div>
        <div className="input-container">
          <label>Description</label>
          <textarea
            value={product.description}
            onChange={e => onChange(e, 'description')}
          />
        </div>
        <div className="input-container">
          <label>Change Image (optional)</label>
          <input type="file" onChange={onFileChange} />
        </div>
        {product.imageFile ? (
          <img
            src={URL.createObjectURL(product.imageFile)}
            alt="Preview"
            width="150"
          />
        ) : (
          product.Image && <img src={product.Image} alt="Product" width="150" />
        )}
        <button onClick={onUpdateProduct}>Update Product</button>
      </div>
    </>
  );
};

export default EditProduct;
