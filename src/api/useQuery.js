import { useState, useEffect } from 'react';

export default function useQuery(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint);
        if (!res.ok) throw new Error('Network error');
        const json = await res.json();
        if (!canceled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!canceled) setError(err.message);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    fetchData();
    return () => { canceled = true; };
  }, [endpoint]);

  return { data, loading, error };
}
