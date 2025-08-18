import './CartItem.css';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={`/figures/${item.image}`}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>Quantity: {item.quantity}</p>
        <p>Subtotal: ${(item.price * item.quantity / 100).toFixed(2)}</p>
        <p>Price: ${(item.price / 100).toFixed(2)}</p>
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}












