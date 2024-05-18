import React from "react";
import { useNavigate } from "react-router-dom";

import "../Invoices/ViewInvoices.css";

const ViewInvoices = () => {
  const navigate = useNavigate();

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
    // Add more invoices here
  ];

  const handleViewDetails = (id) => {
    navigate(`/invoice-details/${id}`);
  };

  return (
    <div className="view-invoices">
      <header className="view-invoices-header">
        <h2>Invoice Overview</h2>
      </header>
      <div className="invoice-overview">
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

export default ViewInvoices;
