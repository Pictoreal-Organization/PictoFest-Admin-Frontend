"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/app/context/Auth";
import api from "@/app/api";
import Link from "next/link";

const SideBar = () => {
  const router = useRouter();
  const { setAdminAuthInfo } = useAuth();

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
            href="/dashboard/"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <span className="flex-1 mx-3 whitespace-nowra">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/users"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <span className="flex-1 mx-3 whitespace-nowra">Users</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/events"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <span className="flex-1 mx-3 whitespace-nowra">Events</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/payments"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <span className="flex-1 mx-3 whitespace-nowra">Payments</span>
          </Link>
        </li>
        <li>
          <li>
            <Link
              href="/dashboard/image-upload"
              className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
            >
              <span className="flex-1 mx-3 whitespace-nowrap">
                Image Upload
              </span>
            </Link>
          </li>
          <Link
            href="/dashboard/image-approval"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <span className="flex-1 mx-3 whitespace-nowrap">
              Image Approval
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <span className="flex-1 mx-3 whitespace-nowrap">
              Physical Submission
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
