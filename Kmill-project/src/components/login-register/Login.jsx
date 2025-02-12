import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssMainComp/login.css"; // Asegúrate de que la ruta sea correcta
import "aos/dist/aos.css"; // Importar CSS de AOS

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBackClick = () => {
    navigate(-1); // Navega a la página anterior
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();

        // Aquí guardas el token y el rol en localStorage
        localStorage.setItem("token", data.jwtToken); // Guardamos el token
        localStorage.setItem("role", data.role); // Guardamos el rol (Admin)

        // Redirige a la página principal
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrorMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" data-aos="zoom-in" data-aos-duration="250">
        <button onClick={handleBackClick} className="back-button">
          Atrás
        </button>

        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
            className="input2"
              type="email"
              id="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
            className="input2"
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="footer-links">
          <a href="register">Crear una cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
