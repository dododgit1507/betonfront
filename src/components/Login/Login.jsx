import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const carouselItems = [
    {
      title: "GOBESA INGENIEROS - ANDALUCIA",
      subtitle: "6,192.71 m2",
      image: "/images/proyecto1.webp"
    },
    {
      title: "CREATIVA - TODAY",
      subtitle: "7,403.02 m2",
      image: "/images/proyecto2.webp"
    },
    {
      title: "BINDA - TEN",
      subtitle: "4,490.840 m2",
      image: "/images/proyecto3.webp"
    },
  ];

  return (
    <div className="login-container">
      {/* Left Side - Carousel */}
      <div className="carousel-section">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          className="carousel"
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-slide">
              <div className="carousel-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="carousel-content">
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-section">
        <div className="logo-container">
          <img src="/images/betondecken-logo.png" alt="Logo" className="logo" />
        </div>
        <div className="form-container">
          <p className="subtitle">
            Bienvenido al sistema de Betondecken <br />
            Inicia sesión para gestionar tus pedidos
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <span className="input-icon email-icon"></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <span className="input-icon password-icon"></span>
            </div>

            <div className="recovery-link">
              <a href="#">Recovery Password</a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
