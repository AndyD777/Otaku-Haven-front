import { useState } from 'react';

export default function useMutation(endpoint, method = 'POST') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mutate(body) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Request failed');
      }
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }

  return { mutate, loading, error };
}

