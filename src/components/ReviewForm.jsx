import { useState } from 'react';

export default function ReviewForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, rating });
    setText('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit">Submit Review</button>
    </form>
  );
}