import useQuery from '../api/useQuery';

export default function Orders() {
  // Fetch user's orders - backend endpoint expected to filter by user
  const { data: orders, loading, error } = useQuery('/api/orders');

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!orders.length) return <p>You have no orders yet.</p>;

  return (
    <div className="page">
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} — Status: {order.status} — Created At: {new Date(order.created_at).toLocaleString()}
            {/* ... */}
          </li>
        ))}
      </ul>
    </div>
  );
}
