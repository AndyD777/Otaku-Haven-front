import { useState } from 'react';

export default function ReviewForm({ productId, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      await onSubmit({ productId, rating, comment });
      setRating(5);
      setComment('');
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label htmlFor="rating">Rating (1-5):</label>
      <select
        id="rating"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      >
        {[5,4,3,2,1].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <label htmlFor="comment">Comment:</label>
      <textarea
        id="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={4}
        placeholder="Write your review here..."
      />

      <button type="submit">Submit Review</button>
    </form>
  );
}
