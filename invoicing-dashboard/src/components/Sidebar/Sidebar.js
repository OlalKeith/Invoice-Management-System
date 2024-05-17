import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaFileInvoiceDollar,
  FaCog,
  FaBug,
} from "react-icons/fa";
// import "./Sidebar.css";
import "../Sidebar/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>WestMinister Pay</h3>
      </div>
      <ul className="sidebar-nav">
        <li>
          <FaTachometerAlt /> Dashboard
        </li>
        <li>
          <FaUser /> Contacts
        </li>
        <li className="active">
          <FaFileInvoiceDollar /> Invoice
        </li>
        <li>
          <FaUser /> Leads
        </li>
        <li>
          <FaFileInvoiceDollar /> Reports
        </li>
        <li>
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
