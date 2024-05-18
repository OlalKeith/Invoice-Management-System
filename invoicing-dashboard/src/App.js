import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import NewInvoice from "./components/Invoices/NewInvoice";
import ViewInvoices from "./components/Invoices/ViewInvoices";
import InvoiceDetails from "./components/Invoices/InvoiceDetails";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/new-invoice" element={<NewInvoice />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/view-invoices" element={<ViewInvoices />} />
            <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
