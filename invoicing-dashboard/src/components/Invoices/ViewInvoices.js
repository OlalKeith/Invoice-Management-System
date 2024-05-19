import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Invoices/ViewInvoices.css";
import { deleteInvoice, getInvoices } from "../Api/api";

const ViewInvoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

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

  const handleViewDetails = (id) => {
    navigate(`/invoice-details/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      setInvoices(invoices.filter((invoice) => invoice.id !== id)); // Update state after dleting invoice
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
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
              <th>View</th>
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
                <td
                  className={`status ${
                    invoice.status ? invoice.status.toLowerCase() : ""
                  }`}
                >
                  {invoice.status || "Unknown"}
                </td>
                <td>
                  <button onClick={() => handleViewDetails(invoice.id)}>
                    View Details
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    Delete
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
