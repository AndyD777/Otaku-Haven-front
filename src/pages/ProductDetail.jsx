import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  // Fetch product info
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/reviews/product/${id}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    }
    fetchReviews();
  }, [id]);

  // Fetch favorite status
  useEffect(() => {
    if (user) {
      async function fetchFavorites() {
        try {
          const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/favorites', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const data = await res.json();
          setIsFavorited(data.some(fav => fav.product_id === Number(id)));
        } catch (err) {
          console.error('Failed to fetch favorites:', err);
        }
      }
      fetchFavorites();
    }
  }, [user, id]);

  // Submit a review
  const handleReviewSubmit = async (review) => {
    if (!user) throw new Error("You must be logged in to review.");

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          rating: review.rating,
          comment: review.comment,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to submit review');
      }

      const newReview = await res.json();
      setReviews(prev => [...prev, newReview]);
      alert('Review submitted!');
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!user) return alert('Login required');

    try {
      if (!isFavorited) {
        await fetch(import.meta.env.VITE_BACKEND_URL + '/api/favorites', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify({ product_id: product.id }),
        });
      } else {
        await fetch(import.meta.env.VITE_BACKEND_URL + `/api/favorites/${product.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      alert('Failed to update favorite');
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="page">
      <h2>{product.name}</h2>

      {user && (
        <button onClick={toggleFavorite} style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          {isFavorited ? '★ Unfavorite' : '☆ Favorite'}
        </button>
      )}

      <img src={`/figures/${product.image}`} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      <p><strong>Price: </strong>${(product.price / 100).toFixed(2)}</p>

      <h3>Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        <ul>
          {reviews.map(r => (
            <li key={r.id}>
              ⭐ {r.rating} — {r.comment} <em>by User #{r.user_id}</em>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
      ) : (
        <p><em>Login to leave a review.</em></p>
      )}
    </div>
  );
}
