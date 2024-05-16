import { useState, useEffect, useContext } from "react";
import { Sidebar } from "../../components/Sidebar";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import "./Home.css";

export const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [saldoClp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    nombreUsuario,
    saldoUsd,
    saldoUsdt,
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
    handleLogin,
  } = useContext(ThemeContext);

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

    const email = "prospecto@vitawallet.io";
    const password = "Vita.1212";

    handleLogin(email, password);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || !client || !uid || !expiry) {
        setIsLoading(true);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.qa.vitawallet.io/api/transactions",
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
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, client, uid, expiry, appName]);

  return (
    <>
      <Sidebar />
      <div className="home-container">
        <main className="content">
          <header className="content-header">
            <img
              src="../../../public/images/coin.png"
              alt="Coin"
              className="header-image"
            />
            <h1 className="subtitle">Hola {nombreUsuario} !</h1>
          </header>
          <section className="content-balances">
            <div className="subtitle-2-semibold">
              <p>Mis saldos</p>
            </div>
            <div className="content-balances-currency">
              {isLoading ? (
                <p>Cargando datos...</p>
              ) : (
                <>
                  <article className="balance-item">
                    <div className="balance-item-title">
                      <h2 className="fonts-body">Peso chileno</h2>
                      <img
                        src="../../../public/images/Flags-chile.png"
                        className="flag"
                        alt="Chile Flag"
                      />
                    </div>
                    <p>$ {saldoClp}</p>
                  </article>
                  <article className="balance-item">
                    <div className="balance-item-title">
                      <h2 className="fonts-body">USDT</h2>
                      <img
                        src="../../../public/images/Flags-usdt.png"
                        className="flag"
                        alt="USDT Flag"
                      />
                    </div>
                    <p>$ {saldoUsdt}</p>
                  </article>
                  <article className="balance-item">
                    <div className="balance-item-title">
                      <h2 className="fonts-body">Dolar estadounidense</h2>
                      <img
                        className="flag"
                        src="../../../public/images/Flags-usa.png"
                        alt="USA Flag"
                      />
                    </div>
                    <p>$ {saldoUsd}</p>
                  </article>
                </>
              )}
            </div>
          </section>
          <section className="content-history">
            <h2>Historial</h2>
            <ul>
              {transactions.map((transaction) => {
                const isSender =
                  transaction.attributes.sender_email ===
                  "prospecto@vitawallet.io";
                return (
                  <li key={transaction.id}>
                    <p className="transaction-item">
                      <span className="transaction-type">
                        {isSender ? "Enviaste" : "Recibiste"}
                      </span>
                      <span
                        className={`transaction-amount ${isSender ? "enviaste" : "recibiste"
                          }`}
                      >
                        {isSender ? "-" : "+"}${transaction.attributes.amount}{" "}
                        {transaction.attributes.currency}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};
