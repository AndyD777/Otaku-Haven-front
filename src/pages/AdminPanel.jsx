import { useEffect, useState } from 'react';
import useQuery from '../api/useQuery';

export default function AdminPanel() {
  // Fetch all users or products
  const { data: products, loading, error } = useQuery('/api/products');

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <h2>Admin Panel</h2>
      <p>Manage products and users here (to be implemented).</p>
      <h3>Current Products</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} — ${ (p.price/100).toFixed(2) }</li>
        ))}
      </ul>
    </div>
  );
}
