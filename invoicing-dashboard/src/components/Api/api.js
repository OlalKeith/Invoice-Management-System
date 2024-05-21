// src/components/api.js
import axios from "axios";
// import nodemailer from "nodemailer";

// const API_URL = "http://localhost:5000";
const API_URL = "https://invoice-db-render.onrender.com";

// Get all invoices
export const getInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}/invoices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices", error);
    throw error;
  }
};
// Fetch a single invoice by ID
export const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice", error);
    throw error;
  }
};

// Create a new invoice
export const createInvoice = async (invoice) => {
  try {
    const response = await axios.post(`${API_URL}/invoices`, invoice);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice", error);
    throw error;
  }
};

// Update an invoice
export const updateInvoice = async (id, invoice) => {
  try {
    const response = await axios.put(`${API_URL}/invoices/${id}`, invoice);
    return response.data;
  } catch (error) {
    console.error("Error updating invoice", error);
    throw error;
  }
};

// Delete an invoice
export const deleteInvoice = async (id, invoice) => {
  try {
    const response = await axios.delete(`${API_URL}/invoices/${id}`, invoice);
    return response.data;
  } catch (error) {
    console.error("Error updating invoice", error);
    throw error;
  }
};

// Send invoice email using Nodemailer
// export const sendInvoiceEmail = async (email, invoiceData) => {
//   try {
//     // Create a Nodemailer transporter
//     let transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: "your_email@gmail.com", // Your Gmail address
//         pass: "your_password", // Your Gmail password
//       },
//     });

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Your Company" <your_email@gmail.com>', // Sender address
//       to: email, // List of receivers
//       subject: "Invoice from Your Company", // Subject line
//       html: `
//         <p>Dear Customer,</p>
//         <p>Please find attached the invoice for your recent purchase.</p>
//         <p>Invoice Details:</p>
//         <ul>
//           <li>Client: ${invoiceData.client}</li>
//           <li>Amount: ${invoiceData.amount}</li>
//           <!-- Add more invoice details here -->
//         </ul>
//         <p>Thank you for your business.</p>
//       `, // HTML body
//     });

//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending invoice email", error);
//     throw error;
//   }
// };
