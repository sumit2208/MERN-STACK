import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import Home from "./components/Home";
import Login from "./components/Login";
import LuxuryForm from "./components/Form"; // register form

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <LuxuryForm />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
