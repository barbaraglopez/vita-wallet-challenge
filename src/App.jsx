import "./App.css";
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home.jsx";
import { Register } from "../src/pages/register/Register";
import { Transfer } from "../src/pages/transfer/Transfer";
import { Exchange } from "./pages/exchange/Exchange.jsx";
import { ConfirmationExchange } from "./pages/exchange/ConfirmationExchange.jsx";
import { ConfirmTransc } from "./pages/transfer/ConfirmTransc.jsx";
import { NotFound } from "../src/pages/notfound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <ConfirmationExchange />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exchange"
          element={
            <ProtectedRoute>
              <Exchange />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirm-transaction"
          element={
            <ProtectedRoute>
              <ConfirmTransc />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
