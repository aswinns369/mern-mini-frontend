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
  }, []);

  return (
    <>
      <Navbar />
      <div className="page">
        <h2>My Products</h2>
        <div className="list">
          {items.map(p => (
            <div className="row" key={p._id}>
              <img src={p.Image} alt={p.name} />
              <div className="grow">
                <strong>{p.name}</strong>
                <span>
                  ₹{p.price} • {p.category} • stock {p.stock}
                </span>
              </div>
              <button
                onClick={() =>
                  (window.location.href = `/edit-product/${p._id}`)
                }
              >
                Edit
              </button>
            </div>
          ))}
          {!items.length && (
            <div className="empty">No products yet. Add one!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProducts;
