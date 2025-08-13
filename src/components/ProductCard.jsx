import './ProductCard.css';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <img
        src={`/figures/${product.image}`}
        alt={product.name}
        className="product-card-image"
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${(product.price / 100).toFixed(2)}</p>
      <button onClick={() => onAdd(product)}>Add to Cart</button>
    </div>
  );
}