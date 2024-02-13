"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api";

const Event = ({ data }) => {
  return (
    <main>
      <div
        className="text-lg grid grid-cols-4 justify-around text-black"
        key={data.id}
      >
        <p className="mx-auto">{data.id}</p>
        <p className="mx-auto">{data.name}</p>
        <p className="mx-auto">{data.event_code}</p>
        <p className="mx-auto">{data.event_category}</p>
      </div>
    </main>
  );
};

const getEvent = () => {
  const [eventData, seteventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/events");
      const eventDetails = await response.data;

      toast.success(response.data.message);
      seteventData(eventDetails.data);
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
      <table className="w-4/5 mx-auto mt-4">
        <thead>
          <tr className="flex justify-around text-xl border border-black">
            <th className=" border-black mx-4">Event Id</th>
            <th className="mx-4">Name</th>
            <th className=" border-black mx-4">Code</th>
            <th className=" border-black mx-4">Category</th>
          </tr>
        </thead>
        <tbody>
          {eventData &&
            eventData.map((event) => <Event key={event.id} data={event} />)}
        </tbody>
      </table>
    </div>
  );
}

export default getEvent;
