"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import PhysubmissionRow from "@/app/components/PhysubmissionRow";

const Physubmission = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const getPayments = async () => {
    try {
      let response;
      if (status === "PENDING") {
        response = await api.get(`/dashboard/physubmission/notdone`);
      } else if (status === "RECEIVED") {
        response = await api.get(`/dashboard/physubmission/done`);
      } else {
        response = await api.get(`/dashboard/physubmission/`);
      }
      setUserEvents(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getPayments();
  }, [status]);

  return (
    <div className="w-4/5 mx-5">
      <div className="flex justify-between items-center my-5">
        <input
          className="border border-1 border-black p-2 w-2/4 rounded-md"
          placeholder="Search By User Name and Event Name"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border border-1 border-black w-1/4 h-10 p-2 rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">PHYSICAL SUBMISSION STATUS</option>
          <option value="PENDING">PENDING</option>
          <option value="RECEIVED">RECEIVED</option>
        </select>
      </div>
      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="text-xl border border-1 border-black">
            <th className="border border-1 border-black p-2">Sr. No</th>
            <th className="border border-1 border-black p-2">User Event Id</th>
            <th className="border border-1 border-black p-2">User Name</th>
            <th className="border border-1 border-black p-2">Event Name</th>
            <th className="border border-1 border-black p-2">
              Image Upload Status
            </th>
            <th className="border border-1 border-black p-2">Image Link</th>
            <th className="border border-1 border-black p-2">Photocopy</th>
            <th className="border border-1 border-black p-2">
              Physical Submission
            </th>
          </tr>
        </thead>
        <tbody>
          {userEvents &&
            userEvents
              .filter((userEvent) => {
                if (query === "") {
                  return true;
                } else if (
                  userEvent.name.toLowerCase().includes(query.toLowerCase()) ||
                  userEvent.first_name
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  userEvent.last_name
                    .toLowerCase()
                    .includes(query.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .sort((a, b) => {
                // Put photocopy_needed = true first
                return (b.photocopy_needed === true) - (a.photocopy_needed === true);
              })
              .map((userEvent, index) => (
                <PhysubmissionRow
                  key={userEvent.id}
                  userEvent={userEvent}
                  setUserEvents={setUserEvents}
                  index={index}
                />
              ))}
        </tbody>

      </table>
    </div>
  );
};

export default Physubmission;
