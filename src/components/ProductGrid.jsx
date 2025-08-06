import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], onAdd }) {
  if (products.length === 0) {
    return <p>Loading products...</p>; // or show nothing
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
