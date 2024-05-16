import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormValidation = () => {
    const nameIsValid = name.trim() !== "";
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordIsValid = password.length > 5;
    const confirmPasswordIsValid = confirmPassword === password;
    setIsButtonDisabled(
      !(
        nameIsValid &&
        emailIsValid &&
        passwordIsValid &&
        confirmPasswordIsValid
      )
    );
  };

  useEffect(() => {
    handleFormValidation();
  }, [name, email, password, confirmPassword]);

  return (
    <div className="container">
      <div className="title-container">
        <img
          src="../../../public/icons/back-to.svg"
          className="icon"
          onClick={() => navigate("/")}
          alt="Back"
        />
        <h1>Registrarse</h1>
      </div>
      <div className="container-content">
        <div className="container-register">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`button ${isButtonDisabled ? "" : "button-primary"}`}
              disabled={isButtonDisabled}
            >
              Enviar
            </button>
          </form>
        </div>
        <div className="container-imagen">
          <img
            src="../../../public/images/icon-register.jpg"
            alt="Register Icon"
            className="container-imagen-img"
          />
        </div>
      </div>
    </div>
  );
};
