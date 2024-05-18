import React, { useState } from "react";
import "../Invoices/NewInvoice.css";

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

  const calculateTotal = () => {
    return items
      .reduce((acc, item) => acc + item.quantity * item.rate, 0)
      .toFixed(2);
  };

  return (
    <div className="new-invoice">
      <header className="new-invoice-header">
        <h2>Create New Invoice</h2>
        <div>
          <button>Save</button>
          <button>Send</button>
        </div>
      </header>

      <div className="client-info">
        <h3>Client Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          onChange={handleClientChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Client Email"
          onChange={handleClientChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Client Address"
          onChange={handleClientChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Invoice Date"
          onChange={handleClientChange}
        />
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          onChange={handleClientChange}
        />
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
        <p>Subtotal: ${calculateTotal()}</p>
        <p>Taxes: $0.00</p>
        <h4>Total: ${calculateTotal()}</h4>
      </div>

      <footer className="new-invoice-footer">
        <button>Save as Draft</button>
        <button>Send Invoice</button>
      </footer>
    </div>
  );
};

export default NewInvoice;
