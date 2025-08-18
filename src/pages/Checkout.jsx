import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Checkout({ cartItems, onClearCart }) {
  const { user } = useAuth(); // now user includes token
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (!user) return alert('You must be logged in to checkout.');
    if (cartItems.length === 0) return alert('Cart is empty.');

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // now works correctly
        },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Payment failed');
      }

      const order = await res.json();
      setMessage(`Payment successful! Order #${order.id} created.`);
      onClearCart(); // Clear the cart
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} — Quantity: {item.quantity} — ${(item.price * item.quantity / 100).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${(total / 100).toFixed(2)}</h3>

          <button onClick={handlePayment} disabled={loading} style={{ padding: '0.6rem 1.2rem', marginTop: '1rem', backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>

          {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
        </>
      )}
    </div>
  );
}
