import React, { useState } from "react";

const DateRangeDropdown = ({ onSelectRange }) => {
  const [selectedRange, setSelectedRange] = useState("день");

  const options = [
    { label: "День", value: "day" },
    { label: "3 дня", value: "three days" },
    { label: "Неделя", value: "week" },
    { label: "Месяц", value: "mounth" }
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedRange(value);
    onSelectRange(value);
  };

  return (
    <div>
      <label htmlFor="date-range">Выберите диапазон:</label>
      <select id="date-range" value={selectedRange} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateRangeDropdown;