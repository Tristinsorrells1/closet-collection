import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addToCalendar } from "../../apiCall";

export const Calendar = ({ id }) => {
  const [startDate, setStartDate] = useState(new Date());

  const getDate = (date) => {
    addToCalendar(date.toISOString().slice(0, 10), id)
   .then((res) => {
      if (res.ok) {
        //
      }
      else {
       //
      }
   })
  }

  return (
    <DatePicker
      showMonthDropdown
      showYearDropdown
      // dropdownMode="select"
      selectsRange
      inline
      popperProps={{strategy: 'absolute'}} 
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [-50, 0],
          },
        },
      ]}
      selected={startDate}
      onChange={(date) => {
        setStartDate(date) 
        getDate(date)}}
    />
  );
};