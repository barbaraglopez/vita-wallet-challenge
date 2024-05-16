import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(ThemeContext);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

