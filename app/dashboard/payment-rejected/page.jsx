// import React from 'react'
"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api";

const Payment = ({ payment }) => {
  return (
    <>
      <div
        className="text-lg grid grid-cols-4 justify-around text-black"
        key={payment.id}
      >
        <p className="mx-auto">{payment.id}</p>
        <p className="mx-auto">{payment.fk_user}</p>
        <p className="mx-auto">{payment.transaction_id}</p>
        <p className="mx-auto">{payment.amount}</p>
        {/* <p className="mx-24">{payment.event_ids}</p> */}
      </div>
    </>
  );
};

const PaymentRejected = () => {
  const [paymentData, setpaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/dashboard/payments/rejected");
      const paymentDetails = await response.data;

      toast.success(response.data.message);
      setpaymentData(paymentDetails.data);
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
    <div className="flex">
      <table className="w-full mx-auto mt-4">
        <thead>
          <tr className="flex justify-around text-xl border border-black">
            <th className=" border-black mx-4">Payment id</th>
            <th className="mx-4">Name</th>
            <th className=" border-black mx-4">Transaction id</th>
            <th className=" border-black mx-4">Payment</th>
            {/* <th className="mx-4">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {paymentData &&
            paymentData.map((payment) => (
              <Payment key={payment.id} payment={payment} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentRejected;
