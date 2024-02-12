import SideBar from "@/app/components/Sidebar";

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

export default DashboardLayout;
