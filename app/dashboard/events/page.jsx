"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import EventRow from "@/app/components/EventRow.jsx";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const getEvents = async () => {
    try {
      let response;
      if (category) {
        response = await api.get(`/dashboard/events/${category}`);
      } else {
        response = await api.get(`/dashboard/events/`);
      }
      
      setEvents(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getEvents();
  }, [category]);

  return (
    <div className="w-4/5 mx-5">
      <div className="flex justify-between items-center my-5">
        <input
          className="border border-1 border-black p-2 w-2/4 rounded-md"
          placeholder="Search By Event Name and Event Code"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border border-1 border-black w-1/4 h-10 p-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Event Category</option>
          <option value="PICSOREEL">PICSOREEL</option>
          <option value="WORKSHOP">WORKSHOP</option>
          <option value="EVENTS">EVENTS</option>
        </select>
      </div>
      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="text-xl border border-1 border-black">
            <th className="border border-1 border-black p-2">Sr. No</th>
            <th className="border border-1 border-black p-2">Event Id</th>
            <th className="border border-1 border-black p-2">Name</th>
            <th className="border border-1 border-black p-2">Category</th>
            <th className="border border-1 border-black p-2">Code</th>
            <th className="border border-1 border-black p-2">Price</th>
            <th className="border border-1 border-black p-2">Registrations</th>
            <th className="border border-1 border-black p-2">Export CSV</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events
              .filter((event) => {
                if (query === "") {
                  return event;
                } else if (
                  event.name
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  event.event_code.toLowerCase().includes(query.toLowerCase())
                ) {
                  return event;
                }
              })
              .map((event, index) => <EventRow key={event.id} event={event} index={index}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
