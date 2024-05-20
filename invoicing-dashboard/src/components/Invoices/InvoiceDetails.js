import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Invoices/InvoiceDetails.css";

import { updateInvoice, getInvoiceById } from "../Api/api";

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const fetchedInvoice = await getInvoiceById(id);
        setInvoice(fetchedInvoice);
        setStatus(fetchedInvoice.status);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const saveChanges = async () => {
    try {
      const updatedInvoice = { ...invoice, status };
      await updateInvoice(id, updatedInvoice);
      // success message
      setSaveSuccess("Saved successfully !");
      setTimeout(() => {
        setSaveSuccess("");
        navigate("/view-invoices");
      }, 2000);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>No invoice found.</div>;
  }

  return (
    <div className="invoice-details">
      {saveSuccess && <div className="success-message">{saveSuccess}</div>}
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
          <span className={`status ${status.toLowerCase()}`}>{status}</span>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.rate}</td>
                <td>${invoice.amount}</td>
                <td>
                  <button
                    className={status === "Paid" ? "paid" : "unpaid"}
                    onClick={() => handleStatusChange("Paid")}
                  >
                    Paid
                  </button>
                  <button
                    className={status === "Unpaid" ? "paid" : "unpaid"}
                    onClick={() => handleStatusChange("Unpaid")}
                  >
                    Unpaid
                  </button>
                </td>
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
        <button onClick={() => navigate(`/edit-invoice/${id}`)}>
          Edit Invoice
        </button>{" "}
        <button onClick={saveChanges}>Save</button>
      </footer>
    </div>
  );
};

export default InvoiceDetails;
