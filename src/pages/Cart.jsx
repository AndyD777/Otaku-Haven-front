import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

export default function Cart({ items, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map(item => (
            <CartItem key={item.id} item={item} onRemove={onRemove} />
          ))}
          <h3>Total: ${(total / 100).toFixed(2)}</h3>
          <Link to="/checkout">
            <button style={{ padding: '0.6rem 1.2rem', marginTop: '1rem', backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
