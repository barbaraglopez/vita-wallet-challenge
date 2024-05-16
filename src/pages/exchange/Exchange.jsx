import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import "./Exchange.css";

export const Exchange = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    envias: "",
    monto: "",
    recibes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    navigate("/confirmation", { state: { data: formData } });
  };

  return (
    <>
      <Sidebar />
      <div className="transfer-container">
        <main className="content">
          <h1 className="subtitle header">Cuánto deseas cambiar?</h1>
          <div className="confirmation-content">
            <form className="transfer-form">
              <div className="form-group">
                <label htmlFor="envias">
                  <p>Tu envias</p>
                </label>
                <select
                  id="envias"
                  name="envias"
                  value={formData.envias}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Selecciona la moneda
                  </option>
                  <option value="usd">USD</option>
                  <option value="usdt">USDT</option>
                  <option value="btc">BTC</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="monto">
                  <p>Ingresa el monto</p>
                </label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  value={formData.monto}
                  placeholder="$monto"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="recibes">
                  <p>Recibes en</p>
                </label>
                <select
                  id="recibes"
                  name="recibes"
                  value={formData.recibes}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Selecciona la moneda
                  </option>
                  <option value="usd">USD</option>
                  <option value="usdt">USDT</option>
                  <option value="btc">BTC</option>
                </select>
              </div>

              <div className="buttons-container">
                <button
                  type="button"
                  className="button-primary"
                  onClick={handleContinue}
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
