import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../DatePicker/NewCustomDatePicker.css";

const NewCustomDatePicker = ({ placeholder }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText={placeholder}
      className="custom-date-picker"
    />
  );
};

export default NewCustomDatePicker;
