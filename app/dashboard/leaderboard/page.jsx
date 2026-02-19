"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
// import api from "@/app/api.js";
import publicApi from "@/app/publicApi";
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
  const [votesByCategory, setVotesByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("SK");

  const getEntries = async () => {
    try {
      // const response = await api.get(`/dashboard/leaderboard/`);
      const response = await publicApi.get(`/dashboard/leaderboard/`);
      console.log("Leaderboard Full Response:", response);
    console.log("Leaderboard Data:", response.data);
      setEntries(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const getVotesByCategory = async () => {
    try {
      // const response = await api.get("/dashboard/votesByCategory");
      const response = await publicApi.get("/dashboard/votesByCategory");
      
    console.log("Votes Full Response:", response);
    console.log("Votes Data:", response.data);
      setVotesByCategory(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
    getVotesByCategory();
  }, []);

  // Prepare data for the pie chart
  const pieChartData = {
    labels: votesByCategory.map((entry) => entry.event_code),
    datasets: [
      {
        data: votesByCategory.map((entry) => entry.vote_count),
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
        ],
      },
    ],
  };

  // Prepare bar chart data for the selected category
  const getBarChartData = (categoryCode) => {
    const categoryData = entries[categoryCode] || [];
    const top5 = categoryData.slice(0, 5);

    return {
      labels: top5.map((entry) => `${entry.first_name} ${entry.last_name}`),
      datasets: [
        {
          label: "Votes",
          data: top5.map((entry) => parseInt(entry.vote_count)),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Contestants",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Votes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Contestants",
        },
      },
    },
  };

  const categories = {
    SK: "SKETCHING",
    PA: "PAINTING",
    PH: "PHOTOGRAPHY",
    SS: "SCRIPT AND STYLES",
    TH: "THEMED CATEGORY",
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

          {/* Category Selection */}
          <div className="mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg focus:outline-none ring-2 ring-indigo-500 focus:ring-2 focus:ring-indigo-500 w-full"
            >
              {Object.entries(categories).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Display Top 5 Entries for Selected Category */}
          {entries[selectedCategory] && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Top 5 Entries in {categories[selectedCategory]}
              </h3>
              <ul className="space-y-3">
                {entries[selectedCategory].slice(0, 5).map((entry, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300"
                  >
                    <span>
                      {entry.first_name} {entry.last_name}
                    </span>
                    <span>{entry.vote_count} votes</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bar Chart */}
          {entries[selectedCategory] && (
            <Bar data={getBarChartData(selectedCategory)} options={barChartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;