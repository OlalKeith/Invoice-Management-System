import React from "react";
import "../Dashboard/Dashboard.css";

const Dashboard = () => {
  const invoices = [
    {
      id: "0012345",
      client: "Sra Membrit",
      date: "20-10-2023",
      amount: 2350.0,
      due: "20-10-2023",
      status: "Paid",
    },
    {
      id: "0012346",
      client: "Pete Sariya",
      date: "18-10-2023",
      amount: 4350.0,
      due: "18-10-2023",
      status: "Unpaid",
    },
    // ... add more invoices here
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Overview</h2>
        <button>Create Invoice</button>
      </header>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Invoice</h3>
          <p>2260</p>
        </div>
        <div className="stat-card">
          <h3>Pending Invoice</h3>
          <p>1260</p>
        </div>
        <div className="stat-card">
          <h3>Paid Invoice</h3>
          <p>1000</p>
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
                <td>${invoice.amount.toFixed(2)}</td>
                <td>{invoice.due}</td>
                <td className={`status ${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
