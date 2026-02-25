

import './home.css';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  
  
  const fetchProducts = async () => {
    try {
      const query = searchParams.toString();
      const res = await api.get(`/product?${query}`);
      setProducts(res.data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);


  const addToCart = async productId => {
    try {
      await api.post('/cart/add', { productId, quantity: 1 });
      toast.success('Added to cart!');
    } catch (e) {
      if (e.response?.status === 401) {
        toast.error('Please login to add to cart');
        navigate('/login');
      } else {
        toast.error(e.response?.data?.message || 'Failed to add to cart');
      }
    }
  };

  
  const handleDelete = async id => {
    try {
      const res = await api.delete(`/product/${id}`);
      toast.success(res.data.message);

      
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="page-full">
        <section className="grid-full">
          {products.map(item => (
            <div
              className="card clickable"
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img src={item.Image} alt={item.name} />

              <div className="pad">
                <h3>{item.name}</h3>
                <div className="price">₹{item.price}</div>
                <div className="meta">
                  {item.category} • Stock: {item.stock}
                </div>

                <div className="actions">
                  <button
                    className="btn primary"
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(item._id);
                    }}
                  >
                    Add to Cart
                  </button>

                  {user && user.id === item.userId && (
                    <>
                      <button
                        className="btn green"
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/edit-product/${item._id}`);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn red"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(item._id); 
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {!products.length && <div className="empty">No products found.</div>}
        </section>
      </div>
    </>
  );
};

export default Home;
