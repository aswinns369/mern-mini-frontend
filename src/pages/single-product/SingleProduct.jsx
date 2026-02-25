import './single-product.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        setProduct(res.data);
      } catch (e) {
        toast.error('Failed to load product details');
      }
    };
    fetchProduct();
  }, [id]);

  
  const handleAddToCart = async () => {
    try {
      await api.post('/cart/add', { productId: product._id, quantity: 1 });
      toast.success('Added to cart!');
      setTimeout(() => navigate('/cart'), 1000);
    } catch (e) {
      if (e.response?.status === 401) {
        toast.error('Please login to add to cart');
      } else {
        toast.error(e.response?.data?.message || 'Failed to add to cart');
      }
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-view-container">
      <ToastContainer />
      <div className="product-view-card">
        <div className="img-section">
          <img src={product.Image} alt={product.name} />
        </div>
        <div className="info-section">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          {product.description && <p className="desc">{product.description}</p>}
          <button className="add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="back-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
