import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Login failed');
      }

      const data = await res.json();
      login(data.user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label htmlFor="username">Username</label>
      <input id="username" value={username} onChange={e => setUsername(e.target.value)} required />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit">Log In</button>
    </form>
  );
}
