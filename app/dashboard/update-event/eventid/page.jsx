"use client";
import React, { useState, useEffect } from "react";
import api from "@/app/api";

const UpdateEvent = ({ params }) => {
  const eventID = params;
  const [event, setEvent] = useState({
    id: eventID,
    event_category: eventID.event_category,
    name: "",
    description: "",
    logo_link: "",
    rules: { 1: "" },
    price: 0,
    is_active: true,
    contact_details: {
      name: "",
      phone: "",
    },
    wa_link: "",
    team_category: "",
    event_code: "",
    venue: "",
    event_date: "",
    mode: "",
  });

  const getData = async () => {
    try {
      const response = await api.get(`/events/${eventID}`);
      const eventDetails = await response.data;

      toast.success(response.data.message);
      setEvent(eventDetails.data);
    } catch (err) {
        toast.error(err.response.data.message);
      console.log(err);
    } finally {
      //   setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const index = Object.values(data.rules).length;
    setData((prev) => ({
      ...prev,
      rules: { ...prev.rules, [index + 1]: "" },
    }));
  };

  useEffect(() => {
    getData();
    console.log("hi");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/events/${eventID}`, {event});
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleContactDetailsChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setEvent((prevData) => ({
      ...prevData,
      contact_details: {
        ...prevData.contact_details,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <article class="mx-auto my-10 w-2/3 bg-slate-100 rounded-xl shadow-lg">
        <form>
          <div class="mx-20 my-10 text-slate-900 text-3xl font-semibold">
            <div class="pt-10">Update Event</div>
            <div class="border-2 border-slate-300 my-2"></div>
          </div>

          <div class="mx-18 mb-4 flex flex-row">
            <input
              class="shadow appearance-none border rounded w-96 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              value={event.name}
              onChange={handleChange}
              type="text"
              placeholder="Event Name"
            />
            <input
              class="shadow appearance-none border rounded w-56 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="event_category"
              value={event.event_category}
              onChange={handleChange}
              type="text"
              placeholder="Event Category"
            />
            <input
              class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="event_code"
              value={event.event_code}
              onChange={handleChange}
              type="text"
              placeholder="Event Code"
            />
          </div>
          <div class="flex flex-row">
            <div class="mx-18 mb-4">
              <input
                class="shadow appearance-none border rounded w-42 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="event_date"
                value={event.event_date}
                onChange={handleChange}
                type="text"
                placeholder="Date"
              />
              <input
                class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="venue"
                value={event.venue}
                onChange={handleChange}
                type="text"
                placeholder="Venue"
              />
              <input
                class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="mode"
                value={event.mode}
                onChange={handleChange}
                type="text"
                placeholder="Mode"
              />
              <input
                class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="price"
                value={event.price}
                onChange={handleChange}
                type="float"
                placeholder="Price"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <input
              class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={event.contact_details.name}
              onChange={handleContactDetailsChange}
              placeholder="Name"
            />
            <input
              class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="phone"
              value={event.contact_details.phone}
              onChange={handleContactDetailsChange}
              placeholder="Phone"
            />
            <input
              class="shadow appearance-none border rounded w-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="team_category"
              value={event.team_category}
              onChange={handleChange}
              type="float"
              placeholder="Team Category"
            />
          </div>
          <div class="mb-4 mx-18">
            <input
              class="shadow appearance-none border rounded w-full py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="logo_link"
              value={event.logo_link}
              onChange={handleChange}
              type="textarea"
              placeholder="Logo link"
            />
            <input
              class="shadow appearance-none border rounded w-full py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="wa_link"
              value={event.wa_link}
              onChange={handleChange}
              type="textarea"
              placeholder="Whatsapp link"
            />
            <textarea
              class="shadow appearance-none border rounded w-full h-48 py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              value={event.description}
              onChange={handleChange}
              type="textarea"
              placeholder="Description"
            />
            <div>
              {Object.values(event.rules).map((rule, index) => (
                <div key={index}>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 mx-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name={`rules-${index}`}
                    value={rule}
                    onChange={(e) => handleAdd(index + 1, e.target.value)}
                    type="textarea"
                    placeholder={`Rule ${index + 1}`}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Add Rule</button>
            </div>
          </div>
        </form>
        <div class="mx-20 my-10 pb-10">
          <button
            type="submit"
            class="rounded-sm bg-blue-900 py-1 px-2 flex place-content-center text-white text-sm hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </article>
    </>
  );
};

export default UpdateEvent;
