"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/app/context/Auth";
import api from "@/app/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const { setAdminAuthInfo } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await api.post("/admin/logout");

      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin");

      setAdminAuthInfo({ token: "", admin: {} });

      toast.success(response.data.message);

      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="h-screen p-4 bg-gray-800 sticky left-0 top-0 shadow-lg">
      <ul className="space-y-4 font-bold">
        {/* Home Menu */}
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Home</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/EarlyBird"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/EarlyBird" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Early Bird</span>
          </Link>
        </li>

        {/* Picsoreel and Leaderboard Menu */}
        <li>
          <Link
            href="/dashboard/picsoreel"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/picsoreel" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Picsoreel Analytics</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/leaderboard"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/leaderboard" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Leaderboard</span>
          </Link>
        </li>

        {/* Other Menus */}
        <li>
          <Link
            href="/dashboard/users"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/users" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Users</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/events"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/events" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Events</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/payments"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/payments" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Payments</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/images"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/images" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Images</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/physubmission"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/physubmission" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Physical Submission</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/entries"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/entries" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Entries</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/votes"
            className={`flex items-center p-3 rounded-lg text-white hover:bg-gray-700 group ${pathname === "/dashboard/votes" ? "bg-gray-700" : ""}`}
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Votes</span>
          </Link>
        </li>

        {/* Logout Button */}
        <li>
          <div className="flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 group">
            <button 
              className="w-full text-left text-white font-semibold px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
