import React from "react";
import "../Dashboard/Dashboard.css";

const Dashboard = () => {
  const invoices = [
    {
      id: "0012345",
      client: "Sra Membrit",
      date: "20-10-2023",
      amount: 2350.0,
      due: "20-10-2023",
      status: "Paid",
    },
    {
      id: "0012346",
      client: "Pete Sariya",
      date: "18-10-2023",
      amount: 4350.0,
      due: "18-10-2023",
      status: "Unpaid",
    },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header"></header>
      <h2>Overview</h2>
      <button>Create Invoice</button>
    </div>
  );
};
export default Dashboard;
