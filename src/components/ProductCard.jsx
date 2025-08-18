import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAdd }) {
  const [isFavorited, setIsFavorited] = useState(false);

  async function toggleFavorite() {
    try {
      const token = localStorage.getItem('token'); // assuming you store JWT here
      if (!token) return alert('Login required');

      if (!isFavorited) {
        // Add to favorites
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: product.id }),
        });
      } else {
        // Remove from favorites
        await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/favorites/${product.id}`,
          {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error(err);
    }
  }

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
      <button onClick={toggleFavorite}>
        {isFavorited ? '★ Unfavorite' : '☆ Favorite'}
      </button>
    </div>
  );
}
