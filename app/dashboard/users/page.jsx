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

  return (
    <div className="w-4/5 mx-5">
      <div className="flex justify-between items-center my-5">
        <input
          className="border border-1 border-black p-2 w-2/4 rounded-md"
          placeholder="Search By Name, Email and Mobile Number"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
                if (query === "") {
                  return user;
                } else if (
                  user.first_name.toLowerCase().includes(query.toLowerCase()) ||
                  user.last_name.toLowerCase().includes(query.toLowerCase()) ||
                  user.email.toLowerCase().includes(query.toLowerCase()) ||
                  user.mobile_number.toLowerCase().includes(query.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => <UserRow key={user.id} user={user} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
