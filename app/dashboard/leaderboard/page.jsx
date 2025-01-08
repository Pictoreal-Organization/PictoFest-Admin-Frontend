"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api.js";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [category, setCategory] = useState("");
  const [votesByCategory, setVotesByCategory] = useState([]);
  const [selectedCategoryEntries, setSelectedCategoryEntries] = useState([]);

  const getEntries = async () => {
    try {
      let response;
      if (category) {
        response = await api.get(`/dashboard/votedentries/${category}`);
      } else {
        response = await api.get(`/dashboard/votedentries/`);
      }

      // Limiting the entries to the first 5 per category
      setEntries(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const getVotesByCategory = async () => {
    try {
      const response = await api.get("/dashboard/votesByCategory");
      setVotesByCategory(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
    getVotesByCategory();
  }, [category]);

  // Group entries by category
  const groupedEntries = entries.reduce((acc, entry) => {
    const cat = entry.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(entry);
    return acc;
  }, {});

  // Prepare chartData for the leaderboard section based on the selected category
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Votes",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (category && groupedEntries[category]) {
    const topEntries = groupedEntries[category].slice(0, 5); // Take the first 5 entries
    chartData.labels = topEntries.map(
      (entry) => `${entry.first_name} ${entry.last_name}`
    );
    chartData.datasets[0].data = topEntries.map((entry) => entry.votes);
    setSelectedCategoryEntries(topEntries);
  }

  // Prepare data for the pie chart
  const pieChartData = {
    labels: votesByCategory.map((entry) => entry.category), // Category names
    datasets: [
      {
        data: votesByCategory.map((entry) => entry.vote_count), // Vote counts for each category
        backgroundColor: [
          "#FF9999",
          "#66B3FF",
          "#99FF99",
          "#FFCC99",
          "#FF6347",
          "#40E0D0",
          "#9B30FF",
          "#FF4500",
          "#FFD700",
          "#32CD32",
          "#C71585",
          "#B0E0E6",
          "#20B2AA",
        ], // Customize colors
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Pie Chart Section */}
        <div className="my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Votes by Category
          </h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    boxWidth: 10,
                    padding: 15,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${context.raw} votes`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* Bar Chart Section */}
        <div className="my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Leaderboard
          </h2>

          {/* Dropdown for selecting category */}
          <div className="mb-6">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg focus:outline-none ring-2 ring-indigo-500 focus:ring-2 focus:ring-indigo-500 w-full"
            >
              <option value="PS">PAINTING/SKETCHING</option>
              <option value="DA">DIGITAL ART</option>
              <option value="PH">PHOTOGRAPHY</option>
              <option value="TH">THEME CATEGORY</option>
            </select>
          </div>

          {/* Display Top 5 Entries for the Selected Category */}
          {selectedCategoryEntries.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Top 5 Entries in {category}
              </h3>
              <ul className="space-y-3">
                {selectedCategoryEntries.map((entry, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300"
                  >
                    <span>
                      {entry.first_name} {entry.last_name}
                    </span>
                    <span>{entry.votes} votes</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Bar Chart for the selected category */}
          {category && (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Votes for Entries",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
