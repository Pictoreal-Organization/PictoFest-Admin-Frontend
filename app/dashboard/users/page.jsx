"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import UserRow from "@/app/components/UserRow.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const getUsers = async () => {
    try {
      let response;
      if (type) {
        response = await api.get(`/dashboard/users/${type}`);
      } else {
        response = await api.get(`/dashboard/users/`);
      }
      setUsers(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [type]);

  const handleSearch = (query) => {
    const trimmedQuery = query.trim().replace(/\s+/g, " "); // Trim and normalize spaces
    setQuery(trimmedQuery);
  };

  return (
    <div className="w-4/5 mx-5">
      <div className="flex justify-between items-center my-5">
        <input
          className="border border-1 border-black p-2 w-2/4 rounded-md"
          placeholder="Search By Name, Email and Mobile Number"
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          className="border border-1 border-black w-1/4 h-10 p-2 rounded-md"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">College Type</option>
          <option value="PICT">PICT</option>
          <option value="NON-PICT">NON-PICT</option>
        </select>
      </div>
      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="text-xl border border-1 border-black">
            <th className="border border-1 border-black p-2">Sr. No</th>
            <th className="border border-1 border-black p-2">User Id</th>
            <th className="border border-1 border-black p-2">Name</th>
            <th className="border border-1 border-black p-2">Email</th>
            <th className="border border-1 border-black p-2">Mobile Number</th>
            <th className="border border-1 border-black p-2">College Type</th>
            <th className="border border-1 border-black p-2">College Name</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users
              .filter((user) => {
                const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ");
                const fullName = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
                
                if (query === "") {
                  return user;
                } else if (
                  fullName.includes(normalizedQuery) ||
                  user.email.toLowerCase().includes(normalizedQuery) ||
                  user.mobile_number.toLowerCase().includes(normalizedQuery)
                ) {
                  return user;
                }
              })
              .map((user, index) => (
                <UserRow key={user.id} user={user} index={index} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
