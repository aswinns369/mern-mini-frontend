// src/pages/single-product/SingleProduct.jsx
import './single-product.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';

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
    <>
      <Navbar />
      <div className="pdp-container">
        <ToastContainer />
        <div className="pdp-layout">
          <div className="pdp-image-col">
            <img src={product.Image} alt={product.name} />
          </div>
          <div className="pdp-info-col">
            <h1 className="pdp-brand">{product.name}</h1>
            <h2 className="pdp-title">{product.category}</h2>
            
            <div className="pdp-price">
              <span className="pdp-mrp">Rs. {product.price}</span>
            </div>
            
            <p className="pdp-tax">inclusive of all taxes</p>

            <div className="pdp-actions">
              <button className="btn-add-bag" onClick={handleAddToCart}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', strokeWidth: '2.5px'}}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                ADD TO BAG
              </button>
            </div>
            
            <hr className="pdp-divider"/>
            
            {product.description && (
              <div className="pdp-details">
                 <h4>PRODUCT DETAILS</h4>
                 <p>{product.description}</p>
                 <br />
                 <p><strong>Stock Available:</strong> {product.stock}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
