import React, { useState } from "react";
import "../Settings/Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "In Soft",
    email: "info@insoft.com",
    address: "123 Main St, Anytown, USA",
    phone: "123-456-7890",
    taxRate: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Handle save logic, e.g., send settings to the server or save in local storage
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings">
      <header className="settings-header">
        <h2>Settings</h2>
      </header>
      <div className="settings-form">
        <label>
          Company Name
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={settings.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tax Rate (%)
          <input
            type="number"
            name="taxRate"
            value={settings.taxRate}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <footer className="settings-footer">
        <button onClick={handleSave}>Save Changes</button>
      </footer>
    </div>
  );
};

export default Settings;
