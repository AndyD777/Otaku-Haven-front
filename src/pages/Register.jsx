import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Registration failed');
      }

      const data = await res.json();
      login({ id: data.id, username: data.username }, data.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Username</label>
      <input value={username} onChange={e => setUsername(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit">Register</button>
    </form>
  );
}
