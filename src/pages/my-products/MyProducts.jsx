// src/pages/my-products/MyProducts.jsx
import './my-products.css';
import { useEffect, useState } from 'react';
import api from '../../api';
import Navbar from '../../components/Navbar/Navbar';

const MyProducts = () => {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const load = async () => {
    const params = new URLSearchParams({ userId: user.id });
    const res = await api.get('/product?' + params.toString());
    setItems(res.data);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="my-products-page">
        <div className="my-products-header">
           <h2>Manage Your Listings</h2>
           <p className="subtitle">Track and grow your sales</p>
        </div>
        <div className="list">
          {items.map(p => (
            <div className="row" key={p._id}>
              <img src={p.Image} alt={p.name} />
              <div className="grow">
                <strong>{p.name}</strong>
                <span>
                  Rs. {p.price} • {p.category} • stock {p.stock}
                </span>
              </div>
              <button
                className="edit-btn"
                onClick={() =>
                  (window.location.href = `/edit-product/${p._id}`)
                }
              >
                EDIT LISTING
              </button>
            </div>
          ))}
          {!items.length && (
            <div className="empty-catalog">
               <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" color="#d4d5d9"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
               <h3>You haven't listed anything yet</h3>
               <p>Start turning your unused items into cash.</p>
               <button onClick={() => window.location.href = '/add-product'}>ADD A PRODUCT</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProducts;
