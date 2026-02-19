"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import VoteRow from "@/app/components/VoteRow.jsx";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const getEntries = async () => {
    try {
      let response;
      if (category) {
        response = await api.get(`/dashboard/votedentries/${category}`);
      } else {
        response = await api.get(`/dashboard/votedentries/`);
      }

      setEntries(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, [category]);

  return (
    <div className="w-4/5 mx-5">
      <div className="flex justify-between items-center my-5">
        <input
          className="border border-1 border-black p-2 w-2/4 rounded-md"
          placeholder="Search By Ticket Id and User Name"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border border-1 border-black w-1/4 h-10 p-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Entry Category</option>
          <option value="SK">SKETCHING</option>
          <option value="PA">PAINTING</option>
          <option value="PH">PHOTOGRAPHY</option>
          <option value="SS">SCRIPT AND STYLES</option>
          <option value="TC">THEMED CATEGORY</option>
        </select>
      </div>
      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="text-xl border border-1 border-black">
            <th className="border border-1 border-black p-2">Sr. No</th>
            <th className="border border-1 border-black p-2">Entry Id</th>
            <th className="border border-1 border-black p-2">Ticket Id</th>
            <th className="border border-1 border-black p-2">User Name</th>
            <th className="border border-1 border-black p-2">Category</th>
            <th className="border border-1 border-black p-2">Image Link</th>
            <th className="border border-1 border-black p-2">Votes</th>
          </tr>
        </thead>
        <tbody>
          {entries &&
            entries
              .filter((entry) => {
                if (query === "") {
                  return entry;
                } else if (
                  entry.first_name
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  entry.last_name.toLowerCase().includes(query.toLowerCase()) ||
                  entry.ticket_id.toLowerCase().includes(query.toLowerCase())
                ) {
                  return entry;
                }
              })
              .map((entry, index) => (
                <VoteRow key={entry.id} entry={entry} index={index} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;
