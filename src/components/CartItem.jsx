import './CartItem.css';

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <p>{item.name} - ${item.price} × {item.quantity}</p>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}
