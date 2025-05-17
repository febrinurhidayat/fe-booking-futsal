import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin, isAuthenticated }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'client'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const success = onLogin(credentials);
    
    if (success) {
      // Redirect berdasarkan role
      if (credentials.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } else {
      setError('Username atau password salah!');
    }
  };

  // Jika sudah login, redirect ke halaman sesuai role
  if (isAuthenticated) {
    navigate(credentials.role === 'admin' ? '/admin' : '/client');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Login Sebagai
            </label>
            <select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="client">Client</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;