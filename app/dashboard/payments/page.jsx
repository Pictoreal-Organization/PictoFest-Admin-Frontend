"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import PaymentRow from "@/app/components/PaymentRow.jsx";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const getPayments = async () => {
    try {
      let response;
      if (status) {
        response = await api.get(`/dashboard/payments/${status}`);
      } else {
        response = await api.get(`/dashboard/payments/`);
      }
      setPayments(response.data.data);
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
          placeholder="Search By Transaction Id and Name"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border border-1 border-black w-1/4 h-10 p-2 rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">APPROVAL STATUS</option>
          <option value="PENDING">PENDING</option>
          <option value="ACCEPTED">ACCEPTED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>
      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="text-xl border border-1 border-black">
            <th className="border border-1 border-black p-2">Sr. No</th>
            <th className="border border-1 border-black p-2">Payment Id</th>
            <th className="border border-1 border-black p-2">Name</th>
            <th className="border border-1 border-black p-2">Transaction Id</th>
            <th className="border border-1 border-black p-2">Amount</th>
            <th className="border border-1 border-black p-2">
              Approval Status
            </th>
          </tr>
        </thead>
        <tbody>
          {payments &&
            payments
              .filter((payment) => {
                if (query === "") {
                  return payment;
                } else if (
                  payment.transaction_id
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  payment.first_name
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  payment.last_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return payment;
                }
              })
              .map((payment, index) => (
                <PaymentRow
                  key={payment.id}
                  payment={payment}
                  setPayments={setPayments}
                  index={index}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
