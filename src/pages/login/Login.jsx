import "./Login.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const {
    handleLogin
  } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginSuccessful = await handleLogin(email, password);
    if (loginSuccessful) {
      navigate("/home");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const emailIsValid = email === "prospecto@vitawallet.io";
      const passwordIsValid = password === "Vita.1212";

      setIsEmailValid(emailIsValid);
      setIsButtonDisabled(!(emailIsValid && passwordIsValid));
    };

    validateForm();
  }, [email, password]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="container-title">Iniciar Sesión</h1>
      <div className="container-content">
        <div className="container-login">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
                {isEmailValid && (
                  <img
                    src="../../../public/icons/check.svg"
                    alt="Email Valid"
                    className="validation-icon"
                  />
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
                <img
                  src={
                    showPassword
                      ? "../../../public/icons/eye-open.svg"
                      : "../../../public/icons/eye-close.svg"
                  }
                  alt="Toggle Password Visibility"
                  onClick={toggleShowPassword}
                  className="password-icon"
                />
              </div>
            </div>
            <div className="form-links">
              <a href="#">¿Olvidaste tu contraseña?</a>
              <a href="#" onClick={() => navigate("/register")}>
                Registrarse
              </a>
            </div>
            <button
              type="submit"
              className={`button ${isButtonDisabled ? "" : "button-primary"}`}
              disabled={isButtonDisabled}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className="container-imagen">
          <img
            src="../../../public/images/home-icon.svg"
            className="container-imagen-img"
            alt="Home Icon"
          />
        </div>
      </div>
    </div>
  );
};
