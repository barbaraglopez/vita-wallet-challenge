import { Sidebar } from "../../components/Sidebar";
import { ThemeContext } from "../../context/ThemeContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Transfer.css";

export const Transfer = () => {
  const navigate = useNavigate();
  const { saldoUsd } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    envias: "",
    correo: "",
    descripcion: "",
  });
  const [formErrors, setFormErrors] = useState({
    correo: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const emailIsValid = /^\S+@\S+\.\S+$/.test(formData.correo);
    const descriptionIsValid = formData.descripcion.length > 0;
    const amountIsValid = /^\d+(\.\d{1,2})?$/.test(formData.envias);
    const allFieldsValid = emailIsValid && descriptionIsValid && amountIsValid;
    setIsFormValid(allFieldsValid);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/confirm-transaction", { state: { data: formData } });
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="transfer-container">
        <main className="content transfer-content">
          <h1 className="subtitle">¿Cuánto deseas enviar?</h1>
          <div className="form-container-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="envias">Tú envías</label>
              <div className="input-icon">
                <img
                  src="../../../public/icons/Stroke.svg"
                  alt="icon"
                  className="icon"
                />
                <input
                  type="number"
                  id="envias"
                  name="envias"
                  value={formData.envias}
                  onChange={handleChange}
                  className="input-icon-content inputForm"
                  placeholder="00.00 USD"
                />
              </div>

              <p className="available-balance-text">
                Saldo disponible usd: $ {saldoUsd}
              </p>

              <h3>Destinatario</h3>

              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="inputForm"
                placeholder="correo electrónico"
              />
              {formErrors.correo && (
                <span className="error">
                  <p>{formErrors.correo}</p>
                </span>
              )}

              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="inputForm"
                placeholder="Escribe aquí un mensaje corto"
              />
              {formErrors.descripcion && (
                <span className="error">
                  <p>{formErrors.descripcion}</p>
                </span>
              )}

              <div className="buttons-container">
                <button
                  type="button"
                  className="button-secondary btnForm"
                  onClick={() => navigate("/home")}
                >
                  Atrás
                </button>

                <button
                  type="submit"
                  className={`button-primary btnForm ${isFormValid ? "button-primary" : "disabled"
                    }`}
                  disabled={!isFormValid}
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};
