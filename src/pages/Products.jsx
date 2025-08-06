import useQuery from '../api/useQuery';
import ProductGrid from '../components/ProductGrid';

export default function Products({ onAdd }) {
  const { data: products, loading, error } = useQuery('/products', 'products');

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <h2>Products</h2>
      <ProductGrid products={products} onAdd={onAdd} />
    </div>
  );
}
