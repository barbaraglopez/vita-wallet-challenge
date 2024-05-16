import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [saldoUsd, setSaldoUsd] = useState(null);
  const [saldoUsdt, setSaldoUsdt] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [client, setClient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [uid, setUid] = useState("");
  const appName = "ANGIE";
  const BASE_URL = "https://api.qa.vitawallet.io/api";

  const isAuthenticated = !!localStorage.getItem("accessToken");

  const navigate = useNavigate()

    const handleLogin = async (email, password) => {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dev_mode", true);

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/sign_in`,
          formData.toString(),
          {
            headers: {
              "app-name": appName,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const accessToken = response.headers["access-token"];
        setAccessToken(accessToken);

        const client = response.headers["client"];
        setClient(client);

        const expiry = response.headers["expiry"];
        setExpiry(expiry);

        const uid = response.headers["uid"];
        setUid(uid);

        const saldousd = response.data?.data?.attributes?.balances?.usd;
        const saldousdt = response.data?.data?.attributes?.balances?.usdt;

        const nombreUsuario = response.data?.data?.attributes?.first_name;

        setSaldoUsd(saldousd);
        setSaldoUsdt(saldousdt);
        setNombreUsuario(nombreUsuario);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("expiry", expiry);
        localStorage.setItem("uid", uid);
        localStorage.setItem("saldousd", saldousd);
        localStorage.setItem("saldousdt", saldousdt);
        localStorage.setItem("nombreUsuario", nombreUsuario);

        return true; // Indicador de éxito de inicio de sesión
      } catch (error) {
        console.error("Error:", error);
        return false; // Indicador de fallo de inicio de sesión
      }
    };

  const signOut = () => {
    localStorage.clear(); 
    navigate("/")
  };


  return (
    <ThemeContext.Provider
      value={{
        handleLogin,
        saldoUsd,
        setSaldoUsd,
        saldoUsdt,
        setSaldoUsdt,
        nombreUsuario,
        setNombreUsuario,
        accessToken,
        setAccessToken,
        client,
        setClient,
        expiry,
        setExpiry,
        uid,
        setUid,
        appName,
        BASE_URL,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
