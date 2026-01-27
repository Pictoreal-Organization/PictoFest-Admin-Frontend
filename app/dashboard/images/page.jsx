"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import ImageRow from "@/app/components/ImageRow.jsx";

const Users = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const getUserEvents = async () => {
    try {
      let response;
      if (status === "IMAGE UPLOADED") {
        response = await api.get(`/dashboard/images/uploaded`);
      } else if (status === "IMAGE NOT UPLOADED") {
        response = await api.get(`/dashboard/images/notuploaded`);
      } else if (status === "IMAGE APPROVAL PENDING") {
        response = await api.get(`/dashboard/images/unapproved`);
      } else if (status === "IMAGE APPROVED") {
        response = await api.get(`/dashboard/images/approved`);
      } else {
        response = await api.get(`/dashboard/images/`);
      }

      setUserEvents(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getUserEvents();
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
          <option value="">STATUS</option>
          <option value="IMAGE UPLOADED">IMAGE UPLOADED</option>
          <option value="IMAGE NOT UPLOADED">IMAGE NOT UPLOADED</option>
          <option value="IMAGE APPROVAL PENDING">IMAGE APPROVAL PENDING</option>
          <option value="IMAGE APPROVED">IMAGE APPROVED</option>
        </select>
      </div>
      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="text-xl border border-1 border-black">
            <th className="border border-1 border-black p-2">Sr. No</th>
            <th className="border border-1 border-black p-2">User Event Id</th>
            <th className="border border-1 border-black p-2">User Name</th>
            <th className="border border-1 border-black p-2">Event Name</th>
            <th className="border border-1 border-black p-2">Image Uploaded</th>
            <th className="border border-1 border-black p-2">Image Link</th>
            <th className="border border-1 border-black p-2">Image Approval</th>
          </tr>
        </thead>
        <tbody>
          {userEvents &&
            userEvents
              .filter((userEvent) => {
                if (query === "") {
                  return userEvent;
                } else if (
                  userEvent.first_name
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  userEvent.last_name
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  userEvent.name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return userEvent;
                }
              })
              .map((userEvent, index) => (
                <ImageRow
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

export default Users;
