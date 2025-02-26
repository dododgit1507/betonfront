import React, { useState } from 'react';
import './Password.css';

const Password = () => {
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let newPassword = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('¡Contraseña copiada!');
  };

  const clearPassword = () => {
    setPassword('');
  };

  return (
    <div className="password-container">
      <h1 className="password-title">Generar Contraseña</h1>
      <div className="password-content">
        <input
          type="text"
          value={password}
          readOnly
          className="password-input"
          placeholder="Tu contraseña aparecerá aquí"
        />
        <div className="button-group">
          <button onClick={generatePassword} className="generate-btn">
            Generar
          </button>
          <button 
            onClick={copyToClipboard} 
            className="copy-btn"
            disabled={!password}
          >
            Copiar
          </button>
          <button 
            onClick={clearPassword} 
            className="clear-btn"
            disabled={!password}
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
