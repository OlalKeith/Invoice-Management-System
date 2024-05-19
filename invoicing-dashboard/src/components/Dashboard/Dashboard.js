import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import { getInvoices } from "../Api/api";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await getInvoices(); // Fetch invoices
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleCreateInvoice = () => {
    navigate("/new-invoice"); // Navigate to new invoice page
  };

  const handleViewDetails = (id) => {
    navigate(`/invoice-details/${id}`);
  };

  // Calculate the total, pending, and paid invoices
  const totalInvoices = invoices.length;
  const unpaidInvoices = invoices.filter(
    (invoice) => invoice.status.toLowerCase() === "unpaid"
  ).length;
  const paidInvoices = invoices.filter(
    (invoice) => invoice.status.toLowerCase() === "paid"
  ).length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Overview</h2>
        <button onClick={handleCreateInvoice}>Create Invoice</button>
      </header>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Invoice</h3>
          <p>{totalInvoices}</p>
        </div>
        <div className="stat-card">
          <h3>Unpaid Invoice</h3>
          <p>{unpaidInvoices}</p>
        </div>
        <div className="stat-card">
          <h3>Paid Invoice</h3>
          <p>{paidInvoices}</p>
        </div>
      </div>
      <div className="invoice-overview">
        <h2>Recent Invoices:</h2>
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Client Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.client}</td>
                <td>{invoice.date}</td>
                <td>${invoice.amount}</td>
                <td>{invoice.due}</td>
                <td className={`status ${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </td>
                <td>
                  <button onClick={() => handleViewDetails(invoice.id)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
