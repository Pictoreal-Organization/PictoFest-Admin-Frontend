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
    <div className="bg-black">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
      </button>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard/payment"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="ms-3">Payment</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/image-uploaded"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Image Uploaded
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/image-approval"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Image Approved
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/image-unapproval"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Image Unapproved
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span class="flex-1 ms-3 whitespace-nowrap">Hardcopy</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center pl-5 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
