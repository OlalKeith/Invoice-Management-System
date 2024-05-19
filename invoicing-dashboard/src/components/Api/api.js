// src/components/api.js
import axios from "axios";

const API_URL = "http://localhost:5000";

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
