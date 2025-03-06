import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../../assets/Logo.png';
import api from '../../../../api'

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { password });
      if (response.status === 200) {
        localStorage.setItem('auth', 'true');
        navigate('/admin');
      }
    } catch (err) {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Estilos personalizados */}
      <style>
        {`
          .input-custom::placeholder {
            color: #fff;
          }
          .btn-custom {
            background-color: #C06D26;
            color: #fff;
            border-radius: 25px;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }
          .btn-custom:hover {
            background-color: rgba(192, 109, 38, 0.40);
          }
        `}
      </style>
      <div
        className="card p-4"
        style={{
          border: '1px solid #000',
          borderRadius: '15px',
          maxWidth: '500px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="text-center mb-4">
          <img src={Logo} alt="Logo Pequeta" style={{ height: '60px' }} />
        </div>
        <h4 className="text-center mb-3" style={{ fontWeight: 'bold' }}>
          INGRESE SU CONTRASEÑA:
        </h4>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control text-center input-custom"
              style={{
                borderRadius: '25px',
                backgroundColor: 'rgba(192,109,38,0.56)',
                color: '#fff'
              }}
              placeholder="Contraseña..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-center text-danger">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-custom"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
