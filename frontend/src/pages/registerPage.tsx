import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../slices/authSlice'; 
import { AppDispatch } from '../store/store'; 

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, password }) as any);
      navigate('/login');  
    } catch (err) {
      setError('הרשמה נכשלה');
    }
  };

  return (
    <div>
      <h2>הרשמה</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">הרשמה</button>
      </form>
      <p>
        have an account?<a href="/login">  Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
