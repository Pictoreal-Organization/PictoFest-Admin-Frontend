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
    <div className="h-screen p-4 bg-gray-800 sticky left-0 top-0">
      <ul className="space-y-2 font-bold">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowra">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/users"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/users"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowra">Users</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/events"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/events"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowra">Events</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/payments"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/payments"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowra">Payments</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/images"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/images"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowrap">Images</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/physubmission"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/physubmission"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowrap">
              Physical Submission
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/entries"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/entries"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowrap">
              Entries
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/votes"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            style={
              pathname === "/dashboard/votes"
                ? {
                    backgroundColor: "rgb(55,65,81)",
                  }
                : {}
            }
          >
            <span className="flex-1 mx-3 whitespace-nowrap">
              Votes
            </span>
          </Link>
        </li>
        <li>
          <div className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group px-5">
            <button className="w-full text-left" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
