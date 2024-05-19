import React, { useState } from "react";
import "../Invoices/NewInvoice.css";
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

  const handleSave = async () => {
    console.log("Save button clicked");
    try {
      const invoiceData = {
        client: clientInfo.name,
        date: clientInfo.date,
        amount: calculateTotal(),
        due: clientInfo.dueDate,
        status: "Unpaid",
        items: items,
        notes: notes,
      };
      await createInvoice(invoiceData);
      console.log("Invoice successfully created!"); // Call createInvoice function to save data
      // Handle success or navigation to another page
    } catch (error) {
      console.error("Error saving invoice:", error);
      // Handle error
    }
  };

  return (
    <div className="new-invoice">
      <header className="new-invoice-header">
        <h2>Create New Invoice</h2>
        <div>
          <button onClick={handleSave}>Save</button>
          <button>Send</button>
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
