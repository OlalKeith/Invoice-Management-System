import React, { useState } from "react";
import "../Invoices/NewInvoice.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import NewCustomDatePicker from "../DatePicker/NewCustomDatePicker";
import { createInvoice } from "../Api/api";

const NewInvoice = () => {
  const [items, setItems] = useState([
    { description: "", quantity: 1, rate: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    address: "",
    date: "",
    dueDate: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index][e.target.name] = e.target.value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const handleClientChange = (e) => {
    setClientInfo({
      ...clientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const calculateAmount = (quantity, rate) => {
    return (quantity * rate).toFixed(2);
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  };

  const calculateTaxes = (subtotal) => {
    const taxRate = 0.16; // 16%
    return (subtotal * taxRate).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxes = calculateTaxes(subtotal);
    return (subtotal + parseFloat(taxes)).toFixed(2);
  };

  const handleSave = async () => {
    console.log("Save button clicked");
    // validation
    if (
      !clientInfo.name ||
      !clientInfo.email ||
      !clientInfo.address ||
      items.some((item) => !item.description || !item.quantity || !item.rate)
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const invoiceData = {
        client: clientInfo.name,
        email: clientInfo.email,
        address: clientInfo.address,
        amount: calculateTotal(),
        invoicedate: clientInfo.date,
        duedate: clientInfo.dueDate,
        status: "Unpaid",
        items: items,
        notes: notes,
      };
      await createInvoice(invoiceData);
      console.log("Invoice successfully created!"); //save data

      setError("");

      // success message
      setSuccessMessage("Invoice successfully created!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/view-invoices");
      }, 2000);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  return (
    <div className="new-invoice">
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <header className="new-invoice-header">
        <h2>Create New Invoice</h2>
        <div>
          <button onClick={handleSave}>Save Invoice</button>
          <button>Send Invoice</button>
        </div>
      </header>

      <div className="client-info">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Client Name"
            onChange={handleClientChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Client Email"
            onChange={handleClientChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Client Address"
            onChange={handleClientChange}
          />
        </div>
        <label>
          Invoice Date
          <CustomDatePicker placeholder="Select a date" />
        </label>
        <label>
          Due Date
          <NewCustomDatePicker placeholder="Select a date" />
        </label>
      </div>

      <div className="invoice-items">
        <h3>Invoice Items</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="description"
                    placeholder="materials/labor"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
                <td>${calculateAmount(item.quantity, item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className="invoice-notes">
        <h3>Notes</h3>
        <textarea
          placeholder="Additional notes or payment instructions"
          onChange={handleNotesChange}
        ></textarea>
      </div>

      <div className="invoice-summary">
        <h3>Summary</h3>
        <p>Subtotal: ${calculateSubtotal()}</p>
        <p>Taxes: ${calculateTaxes(calculateSubtotal())}</p>
        <h4>Total: ${calculateTotal()}</h4>
      </div>

      <footer className="new-invoice-footer">
        <button onClick={handleSave}>Save Invoice</button>{" "}
        <button>Send Invoice</button>
      </footer>
    </div>
  );
};

export default NewInvoice;
