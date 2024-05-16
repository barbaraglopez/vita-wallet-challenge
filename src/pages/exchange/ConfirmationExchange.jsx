import "./ConfirmationExchange.css";
import { Sidebar } from "../../components/Sidebar";
import { ModalSucc } from "../../components/ModalSucc.jsx/ModalSucc";
import { ModalErr } from "../../components/ModalErr/ModalErr";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";

export const ConfirmationExchange = () => {
  const {
    client,
    uid,
    expiry,
    appName,
    accessToken,
    setAccessToken,
    setClient,
    setUid,
    setExpiry,
    setSaldoUsd,
    setSaldoUsdt,
  } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dataGetPrice, setDataGetPrice] = useState(null);
  const [cambio, setCambio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalErrOpen, setIsModalErrOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { state } = useLocation();

  const [data, setData] = useState({
    envias: state.data.envias,
    monto: state.data.monto,
    recibe: state.data.recibes,
  });

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedClient = localStorage.getItem("client");
      const storedUid = localStorage.getItem("uid");
      const storedExpiry = localStorage.getItem("expiry");
      const storedSaldoUsd = localStorage.getItem("saldousd");
      const storedSaldoUsdt = localStorage.getItem("saldousdt");

      if (
        storedAccessToken &&
        storedClient &&
        storedUid &&
        storedExpiry &&
        storedSaldoUsd &&
        storedSaldoUsdt
      ) {
        setAccessToken(storedAccessToken);
        setClient(storedClient);
        setUid(storedUid);
        setExpiry(storedExpiry);
        setSaldoUsd(storedSaldoUsd);
        setSaldoUsdt(storedSaldoUsdt);
      }
    };

    loadFromLocalStorage();
  }, [setAccessToken, setClient, setUid, setExpiry, setSaldoUsd, setSaldoUsdt]);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || !client || !uid || !expiry) {
        setIsLoading(true);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.qa.vitawallet.io/api/users/get_crypto_multi_prices",
          {
            headers: {
              Authorization: "Bearer " + accessToken,
              "app-name": appName,
              "access-token": accessToken,
              uid: uid,
              expiry: expiry,
              client: client,
            },
          }
        );

        setDataGetPrice(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, client, uid, expiry, appName]);

  useEffect(() => {
    if (dataGetPrice) {
      const exchange = (data, dataGetPrice) => {
        const { envias: fromCurrency, monto, recibe: toCurrency } = data;

        const amount = parseFloat(monto.replace(/[,.]/g, ""));

        if (
          !dataGetPrice.prices[fromCurrency] ||
          !dataGetPrice.prices[fromCurrency][toCurrency]
        ) {
          return "Error: Moneda no compatible";
        }

        const exchangeRate = dataGetPrice.prices[fromCurrency][toCurrency];
        const fee =
          dataGetPrice.prices[fromCurrency][
            `${toCurrency}_fee_send_external`
          ] || 0;
        const minTotalSend =
          dataGetPrice.prices[fromCurrency][
            `${toCurrency}_min_total_send_external`
          ] || 0;

        const receivedAmount = amount * exchangeRate;
        const totalAmount = receivedAmount + fee;
        const raf = receivedAmount.toFixed(2);

        if (totalAmount < minTotalSend) {
          return `Error: El monto mínimo a enviar es ${minTotalSend} ${toCurrency}`;
        }

        return {
          fromCurrency,
          toCurrency,
          amountSent: amount,
          raf,
          fee,
          totalAmount,
        };
      };

      const result = exchange(data, dataGetPrice);

      if (typeof result === "string") {
        console.error(result);
      } else {
        setCambio(result.raf);
      }
    }
  }, [dataGetPrice, data]);

  const confirmChange = async () => {
    const response = await axios
      .post(
        "https://api.qa.vitawallet.io/api/transactions/exchange",
        {
          currency_sent: data.envias,
          currency_received: data.recibe,
          amount_sent: parseInt(data.monto),
        },
        {
          headers: {
            "app-name": appName,
            "access-token": accessToken,
            uid: uid,
            expiry: expiry,
            client: client,
          },
        }
      )
      .then((response) => {
        setIsModalOpen(true);
      })
      .catch((error) => {
        setIsModalErrOpen(true);
        setErrMsg(error.response);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalErrOpen(false);
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
              onClick={() => navigate("/exchange")}
              style={{ cursor: "pointer" }}
            />{" "}
            Confirmar cambio
          </h1>
          <div className="confirmation-content">
            <p>
              <span>Tu envias en:</span> <span>{data.envias}</span>
            </p>
            <p>
              <span>Monto que envias:</span> <span>${data.monto}</span>
            </p>
            <p>
              <span>Recibes en:</span> <span>{data.recibe}</span>
            </p>
            <p>
              <span>Monto que recibes:</span>
              <span>${cambio}</span>
            </p>
            <button
              className="button-primary buttonStyle"
              onClick={confirmChange}
            >
              Confirmar
            </button>
          </div>
        </main>
      </div>
      {isModalOpen && <ModalSucc onClose={handleCloseModal} />}
      {isModalErrOpen && <ModalErr onClose={handleCloseModal} text={errMsg} />}
    </>
  );
};
