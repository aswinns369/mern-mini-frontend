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
        <div className="banner-container">
           <img src="/fashion-banner.png" alt="Big Fashion Festival" className="horizontal-banner" />
        </div>

        <section className="grid-full">
          {products.map(item => (
            <div
              className="card"
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <div className="img-container">
                  <img src={item.Image} alt={item.name} />
                  <div className="actions">
                    <button
                        className="btn primary"
                        onClick={e => {
                        e.stopPropagation();
                        addToCart(item._id);
                        }}
                    >
                        ADD TO BAG
                    </button>

                    {user && user.id === item.userId && (
                        <div style={{display: 'flex', gap: '8px', marginTop: '4px'}}>
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
                        </div>
                    )}
                  </div>
              </div>

              <div className="pad">
                <h3 className="brand">{item.name}</h3>
                <p className="desc">{item.category}</p>
                <div className="price">Rs. {item.price}</div>
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
