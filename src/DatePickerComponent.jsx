import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export function DatePickerComponent() {
  const [startDate, setStartDate] = useState(null);
  console.log(startDate);
  const [endDate, setEndDate] = useState(null);

  return (
    <div>
      Start Date:
      <DatePicker
        isClearable
        filterDate={(d) => {
          return new Date() <= d;
        }}
        placeholderText="Select Start Date"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mmaa"
        // dateFormat="Pp"
        allowSameDay={true}
        name="start_time"
      />
      End Date:
      <DatePicker
        isClearable
        filterDate={(d) => {
          return new Date() <= d;
        }}
        placeholderText="Select End Date"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        mindDate={startDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        dateFormat="Pp"
        allowSameDay={true}
        name="end_time"
      />
    </div>
  );
}
