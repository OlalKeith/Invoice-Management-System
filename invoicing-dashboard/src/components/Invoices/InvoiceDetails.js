import React from "react";
import { useParams } from "react-router-dom";

import "../Invoices/InvoiceDetails.css";

const InvoiceDetails = () => {
  const { id } = useParams(); // useParams hook to access the route parameter

  const invoice = {
    id: id,
    client: "Sra Membrit",
    date: "20-10-2023",
    amount: 2350.0,
    due: "20-10-2023",
    status: "Paid",
    items: [
      { description: "Development work", quantity: 10, rate: 150 },
      { description: "Design work", quantity: 5, rate: 100 },
    ],
    notes:
      "Please make payment via bank transfer to account number 1234567890.",
  };

  const calculateAmount = (quantity, rate) => {
    return (quantity * rate).toFixed(2);
  };

  return (
    <div className="invoice-details">
      <header className="invoice-details-header">
        <h2>Invoice Details</h2>
      </header>
      <div className="invoice-info">
        <p>
          <strong>Invoice ID:</strong> {invoice.id}
        </p>
        <p>
          <strong>Client Name:</strong> {invoice.client}
        </p>
        <p>
          <strong>Date:</strong> {invoice.date}
        </p>
        <p>
          <strong>Due Date:</strong> {invoice.due}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${invoice.status.toLowerCase()}`}>
            {invoice.status}
          </span>
        </p>
      </div>
      <div className="invoice-items">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.rate.toFixed(2)}</td>
                <td>${calculateAmount(item.quantity, item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="invoice-notes">
        <h3>Notes</h3>
        <p>{invoice.notes}</p>
      </div>
      <footer className="invoice-details-footer">
        <button>Edit Invoice</button>
        <button>Send Reminder</button>
      </footer>
    </div>
  );
};

export default InvoiceDetails;
