"use state";

import CsvDownloadButton from "react-json-to-csv";
import api from "@/app/api";
import { useEffect, useState } from "react";

const EventRow = (props) => {
  const { event, index } = props;
  const [data, setData] = useState([]);

  const getEventData = async (e) => {
    try {
      const response = await api.get(`/dashboard/events/dataCSV/${event.id}`);
      setData(response.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <tr>
      <td className="border border-1 border-black p-2">{index+1}</td>
      <td className="border border-1 border-black p-2">{event.id}</td>
      <td className="border border-1 border-black p-2">{event.name}</td>
      <td className="border border-1 border-black p-2">
        {event.event_category}
      </td>
      <td className="border border-1 border-black p-2">{event.event_code}</td>
      <td className="border border-1 border-black p-2">{event.price}</td>
      <td className="border border-1 border-black p-2">
        {event.registrations}
      </td>
      <td className="border border-1 border-black p-2">
        <CsvDownloadButton
          delimiter=","
          filename={event.name.split(" ").join("_") + "_Data.csv"}
          className="bg-gray-500 text-xs text-white rounded-lg p-2"
          data={data}
        />
      </td>
    </tr>
  );
};

export default EventRow;
