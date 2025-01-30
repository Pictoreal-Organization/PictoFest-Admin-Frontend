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
  const [analyticsData, setAnalyticsData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/dashboard/statusAnalytics");
      setAnalyticsData(response.data.data);
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
    const eventData = analyticsData.find(
      (item) => item.event_code === selectedEvent
    );

    if (!eventData) {
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
            eventData.uploaded_count,
            eventData.not_uploaded_count,
            eventData.total_approved,
            eventData.total_pending,
            eventData.total_submitted,
            eventData.total_submission_pending,
          ],
          backgroundColor: [
            "#4caf50", // Uploaded - Green
            "#f44336", // Not Uploaded - Red
            "#2196f3", // Approved - Blue
            "#ff9800", // Pending - Orange
            "#9c27b0", // Submitted - Purple
            "#00bcd4", // Not Submitted - Cyan
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
            title: {
              display: true,
              text: `Analytics for ${selectedEvent}`,
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
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
            {analyticsData.map((event) => (
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