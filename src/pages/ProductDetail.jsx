import { useParams } from 'react-router-dom';
import useQuery from '../api/useQuery';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading, error } = useQuery(`/api/products/${id}`);
  const { user } = useAuth();

  // Mock review submit handler
  const handleReviewSubmit = async (review) => {
    if (!user) throw new Error("You must be logged in to review.");
    
    alert(`Review submitted: Rating ${review.rating}, Comment: ${review.comment}`);
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="page">
      <h2>{product.name}</h2>
      <img src={`/figures/${product.image}`} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      <p><strong>Price: </strong>${(product.price / 100).toFixed(2)}</p>

      {user && <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />}
      {!user && <p><em>Login to leave a review.</em></p>}
    </div>
  );
}
