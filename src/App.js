import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CustomerBookingsPage from "./components/CustomerBookingsPage";
import { UserProvider } from "./contexts/UserContext";
//import RegisterForm from "./pages/RegisterPage";
import RegisterForm from "./components/RegisterForm";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/customer-bookings"
                element={<CustomerBookingsPage />}
              />
              </Route>
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
