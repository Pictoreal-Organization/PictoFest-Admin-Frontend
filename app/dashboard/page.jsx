"use client";

import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import EventStatusAnalytics from "../components/EventStatusAnalytics";

const Home = () => {
  const [theme, setTheme] = useState("light");

  // Apply the theme to the body class
  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <main className="w-full">
      <Dashboard />
      {/* <EventStatusAnalytics /> */}
    </main>
  );
};

export default Home;
