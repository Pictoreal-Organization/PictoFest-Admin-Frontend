"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/app/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);

const PicsoreelAnalytics = () => {
  const [selectedEvent, setSelectedEvent] = useState("DA");
  const [analyticsData, setAnalyticsData] = useState({
    data: [],
    formattedData2: [],
    formattedData3: [],
  });

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/dashboard/statusAnalytics");
      setAnalyticsData({
        data: response.data.data,
        formattedData2: response.data.formattedData2,
        formattedData3: response.data.formattedData3,
      });
    } catch (err) {
      toast.error("Failed to fetch analytics data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const renderCombinedGraph = () => {
    const uploadData = analyticsData.data.find(
      (item) => item.event_code === selectedEvent
    );
    const approvalData = analyticsData.formattedData2.find(
      (item) => item.event_code === selectedEvent
    );
    const submissionData = analyticsData.formattedData3.find(
      (item) => item.event_code === selectedEvent
    );

    if (!uploadData || !approvalData || !submissionData) {
      return (
        <p className="text-center text-gray-500">
          No data available for the selected event.
        </p>
      );
    }

    const combinedData = {
      labels: [
        "Uploaded",
        "Not Uploaded",
        "Approved",
        "Pending",
        "Submitted",
        "Not Submitted",
      ],
      datasets: [
        {
          label: "Counts",
          data: [
            parseInt(uploadData.uploded_count),
            parseInt(uploadData.not_uploaded_count),
            parseInt(approvalData.total_approved),
            parseInt(approvalData.total_pending),
            parseInt(submissionData.total_submittedd || 0),
            parseInt(submissionData.total_submission_pending || 0),
          ],
          backgroundColor: [
            "#4caf50",
            "#f44336",
            "#2196f3",
            "#ff9800",
            "#9c27b0",
            "#00bcd4",
          ],
        },
      ],
    };

    return (
      <Bar
        data={combinedData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-2 max-w-screen-xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 w-full">
          Dashboard Analytics
        </h1>
        <div className="flex items-center justify-end gap-4 w-full">
          <label
            htmlFor="event-selector"
            className="text-lg font-medium text-gray-700"
          >
            Select Event:
          </label>
          <select
            id="event-selector"
            value={selectedEvent}
            onChange={handleEventChange}
            className="block p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {analyticsData.data.map((event) => (
              <option key={event.event_code} value={event.event_code}>
                {event.event_code}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="mt-6 w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {renderCombinedGraph()}
      </div>
    </div>
  );
};

export default PicsoreelAnalytics;
