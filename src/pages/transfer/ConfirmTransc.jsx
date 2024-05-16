import "./ConfirmTransc.css";
import { Sidebar } from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalSucc } from "../../components/ModalSucc.jsx/ModalSucc";

export const ConfirmTransc = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState({
    envias: state.data.envias,
    correo: state.data.correo,
  });
  const [btcPriceUSD, setBtcPriceUSD] = useState(null);
  const [amountInBTC, setAmountInBTC] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        setBtcPriceUSD(response.data.bitcoin.usd);
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchBtcPrice();
  }, []);

  useEffect(() => {
    if (btcPriceUSD && data.envias) {
      const amountInBTC = data.envias / btcPriceUSD;
      setAmountInBTC(amountInBTC);
    }
  }, [btcPriceUSD, data.envias]);

  const confirmTransfer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Sidebar />
      <div className="transfer-container">
        <main className="content transfer-content">
          <h1 className="subtitle header">
            <img
              src="../../../public/icons/back-to.svg"
              alt="Back"
              onClick={() => navigate("/transfer")}
              style={{ cursor: "pointer" }}
            />{" "}
            Confirmar cambio
          </h1>
          <div className="confirmation-content">
            <p>
              <span>Destinatario:</span> <span>{data.correo}</span>
            </p>
            <p>
              <span>Tu envias:</span> <span>${data.envias}</span>
            </p>
            <p>
              <span>Tasa de cambio:</span>{" "}
              <span>
                {btcPriceUSD ? `1 USD = ${btcPriceUSD} BTC` : "Cargando..."}
              </span>
            </p>
            <p>
              <span>Envias en BTC:</span>{" "}
              <span>
                {amountInBTC ? amountInBTC.toFixed(8) : "Calculando..."}
              </span>
            </p>
            <p>
              <span>Fecha de arribo:</span> <span>30 Minutos</span>
            </p>
            <button
              className="button-primary buttonStyle"
              onClick={confirmTransfer}
            >
              Confirmar
            </button>
          </div>
        </main>
      </div>
      {isModalOpen && <ModalSucc onClose={handleCloseModal} />}
    </>
  );
};
