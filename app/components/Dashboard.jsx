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
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Dashboard = () => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    totalPicsoreels: 0,
    totalGallery: 0,
    totalVotes: 0,
    transactionAmount: 0,
    collegeTypeChart: { PICT: 0, NON_PICT: 0 },
    paymentStatus: { approved: {}, rejected: {}, pending: {} },
    dailyTransactions: [],
  });

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [
        totalUsers,
        totalEvents,
        totalRegistrations,
        totalPicsoreels,
        totalGallery,
        totalVotes,
        transactionAmount,
        collegeTypeChart,
        paymentStatus,
        dailyTransactions,
      ] = await Promise.all([
        api.get("/dashboard/totalUserCount"),
        api.get("/dashboard/totalEventCount"),
        api.get("/dashboard/totalRegistrationCount"),
        api.get("/dashboard/totalPicsoreelCount"),
        api.get("/dashboard/totalGalleryCount"),
        api.get("/dashboard/totalVoteCount"),
        api.get("/dashboard/totalTransactionAmount"),
        api.get("/dashboard/usersByCollegeTypeChart"),
        api.get("/dashboard/paymentApprovalStatus"),
        api.get("/dashboard/dailyTransactionAmount"),
      ]);

      setAnalytics({
        totalUsers: totalUsers.data.data,
        totalEvents: totalEvents.data.data,
        totalRegistrations: totalRegistrations.data.data,
        totalPicsoreels: totalPicsoreels.data.data,
        totalGallery: totalGallery.data.data,
        totalVotes: totalVotes.data.data,
        transactionAmount: transactionAmount.data.data,
        collegeTypeChart: {
          PICT: collegeTypeChart.data.PICT,
          NON_PICT: collegeTypeChart.data["NON-PICT"],
        },
        paymentStatus: paymentStatus.data,
        dailyTransactions: dailyTransactions.data.data,
      });
    } catch (err) {
      toast.error("Failed to fetch analytics data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
    fetchAnalytics();
  }, [theme]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner">Loading...</div>{" "}
        {/* Add your spinner component */}
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        {/* Add any top header or buttons here */}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12">
        {[
          { label: "Total Users", value: analytics.totalUsers, icon: "👤" },
          { label: "Total Events", value: analytics.totalEvents, icon: "📅" },
          {
            label: "Total Registrations",
            value: analytics.totalRegistrations,
            icon: "📝",
          },
          {
            label: "Total Picsoreels",
            value: analytics.totalPicsoreels,
            icon: "🎞️",
          },
          {
            label: "Total Gallery Entries",
            value: analytics.totalGallery,
            icon: "📸",
          },
          { label: "Total Votes", value: analytics.totalVotes, icon: "🗳️" },
          {
            label: "Transaction Amount",
            value: `₹${analytics.transactionAmount}`,
            icon: "💰",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-white flex items-center justify-between space-x-4 hover:scale-105 hover:shadow-xl transition-all duration-300 transform"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.label}</h2>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Section (Side by Side) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Pie Chart */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 transform">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            PICT / NON-PICT
          </h2>
          <div className="w-1/2 flex justify-center items-center">
          <Pie
            data={{
              labels: ["PICT", "NON-PICT"],
              datasets: [
                {
                  data: [
                    analytics.collegeTypeChart.PICT,
                    analytics.collegeTypeChart.NON_PICT,
                  ],
                  backgroundColor: ["#4caf50", "#ff9800"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Count: ${tooltipItem.raw}`;
                    },
                  },
                },
                legend: {
                  position: "top",
                },
              },
            }}
          />
          </div>
        </div>

        {/* Daily Transactions Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 transform">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Daily Transactions
          </h2>
          <Line
            data={{
              labels: analytics.dailyTransactions.map((entry) => entry.date),
              datasets: [
                {
                  label: "Amount (₹)",
                  data: analytics.dailyTransactions.map(
                    (entry) => entry.amount
                  ),
                  borderColor: "#2196f3",
                  backgroundColor: "rgba(33, 150, 243, 0.2)",
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: "Transaction Count",
                  data: analytics.dailyTransactions.map((entry) => entry.count),
                  borderColor: "#4caf50",
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  grid: { color: "#ccc" },
                  title: { display: true, text: "Date" },
                },
                y: {
                  grid: { color: "#ccc" },
                  title: {
                    display: true,
                    text: "Amount (₹) / Transaction Count",
                  },
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
