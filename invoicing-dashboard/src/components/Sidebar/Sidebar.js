import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaFileInvoiceDollar,
  FaCog,
} from "react-icons/fa";
import "../Sidebar/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>WestMinister Pay</h3>
      </div>
      <ul className="sidebar-nav">
        <li>
          <Link to="/">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <FaUser /> Contacts
        </li>
        <li className="active">
          <Link to="/new-invoice">
            <FaFileInvoiceDollar /> New Invoice
          </Link>
        </li>
        <li>
          <Link to="/view-invoices">
            <FaFileInvoiceDollar /> View Invoices
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
