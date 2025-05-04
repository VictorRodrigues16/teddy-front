import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/auth/Home";
import Clients from "../pages/main/clients/Clients";
import ClientsSelected from "../pages/main/ClientsSelected";
import NotFound from "../pages/auth/NotFound";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  const isAuthenticated = localStorage.getItem("user") !== null;

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/clients" /> : <Home />} 
      />
      <Route
        path="/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
      <Route
        path="/clients-selected"
        element={
          <PrivateRoute>
            <ClientsSelected />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={isAuthenticated ? <NotFound /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
