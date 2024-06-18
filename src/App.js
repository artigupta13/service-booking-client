import React, {Suspense, lazy} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import DashboardPage from "./pages/DashboardPage";
// import CustomerBookingsPage from "./components/CustomerBookingsPage";
import { UserProvider } from "./contexts/UserContext";
import RegisterForm from "./components/RegisterForm";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";

const DashboardPage = lazy(()=> import("./pages/DashboardPage"));
const CustomerBookingsPage = lazy(()=> import("./components/CustomerBookingsPage"));

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div>
       
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" render={() => <h1>404: Page Not Found</h1>} />
           
            <Route element={<Layout />}>
              <Route path="/dashboard" element={ <Suspense fallback={<div>Loading...</div>}><DashboardPage/></Suspense>} />
              <Route
                path="/customer-bookings"
                element={<Suspense fallback={<div>Loading...</div>}><CustomerBookingsPage/></Suspense>}
              />
             
              </Route>
          </Routes>
  
        </div>
        
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
