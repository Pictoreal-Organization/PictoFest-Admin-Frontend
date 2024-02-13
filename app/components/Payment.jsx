// import React from 'react'
"use client";
import axios from "axios";
import { toast } from "sonner";
import Record from "./PaymentRow.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth.jsx";
import { baseURL } from "../api.js";

function Payment() {
  const { adminAuthState } = useAuth();
  const token = adminAuthState.token;
  const [paymentData, setpaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseURL}/dashboard/payments/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paymentDetails = await response.data;

      toast.success(response.data.message);
      setpaymentData(paymentDetails.data);
      console.log(paymentDetails.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <main>
      <table className="w-full mx-auto mt-4">
        <thead>
          <tr className="flex justify-around text-xl border border-black">
            <th className=" border-black mx-4">Payment id</th>
            <th className="mx-4">Name</th>
            <th className=" border-black mx-4">Transaction id</th>
            <th className=" border-black mx-4">Payment</th>
            <th className="mx-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentData &&
            paymentData.map((payment) => (
              <Record key={payment.id} payment={payment} />
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default Payment;
