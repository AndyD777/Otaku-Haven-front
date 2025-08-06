import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.image_url} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <ReviewForm onSubmit={(review) => console.log('Review submitted', review)} />
    </div>
  );
}
