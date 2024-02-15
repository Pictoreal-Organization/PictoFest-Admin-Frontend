"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/api";

const Event = ({ event }) => {
  const router = useRouter();
  const handleChange = (eventid) => {
    router.push(`/update-event/${eventid}`);
  };
  return (
    <>
      <div
        className="text-lg grid grid-cols-5 justify-around text-black"
        key={event.id}
      >
        <p className="mx-auto">{event.id}</p>
        <p className="mx-auto">{event.name}</p>
        <p className="mx-auto">{event.event_code}</p>
        <p className="mx-auto">{event.event_category}</p>
        <button
          className="border-black bg-yellow-400 my-2 hover:bg-yellow-200"
          onClick={handleChange(event.id)}
        >
          Update
        </button>
      </div>
    </>
  );
};

const updateEvent = () => {
  const [eventData, seteventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/events/");
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
            <th className=" border-black mx-4">Update</th>
          </tr>
        </thead>
        <tbody>
          {eventData &&
            eventData.map((event) => <Event key={event.id} event={event} />)}
        </tbody>
      </table>
    </div>
  );
}

export default updateEvent;
