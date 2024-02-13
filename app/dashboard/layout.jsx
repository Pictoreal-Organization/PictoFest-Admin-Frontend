"use client";

import SideBar from "@/app/components/Sidebar";
import isNotAuth from "@/app/components/isNotAuth";

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex">
      <div className="w-1/5">
        <SideBar />
      </div>
      {children}
    </main>
  );
};

export default isNotAuth(DashboardLayout);
