import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerComponent() {
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      Start Date:
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
        allowSameDay={true}
        name="start_time"
      />
      End Date:
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
        allowSameDay={true}
        name="end_time"
      />
    </div>
  );
}
