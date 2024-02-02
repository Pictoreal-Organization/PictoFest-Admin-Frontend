"use client";
import axios from "axios";
import { useContext } from "react";
import Payment from "./components/Payment";
import SideBar from "./components/SideBar";
import ImageApprov from "./components/ImageApprov";
import { AuthContext } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = () => {
  const router = useRouter();
  const { adminAuthState, isAdminAuthenticated, removeAdminAuth } =
    useContext(AuthContext);
  const token = adminAuthState.token;
  const adminAuthenticated = isAdminAuthenticated();
  console.log(adminAuthState);

  const handleLogOut = async () => {
    console.log(adminAuthState.token);

    try {
      console.log(token);
      const response = await axios.post(
        `${baseURL}/admin/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("in try");
      console.log(token);
      toast.success(response.data.data.message);
      router.push("/login");
      removeAdminAuth();
      console.log(response.data);
    } catch (err) {
      console.log("hi");
      console.log(err);
      // toast.error(err.response.data.message);
    }
  };

  return (
    <main className="">
      {/* <h1>Admin token : {adminAuthState.token}</h1>
      <h1>Admin id : {adminAuthState.id}</h1> */}

      {adminAuthenticated ? (
        <div className="flex">
          <div className="w-1/5">
            <SideBar />
          </div>
          <div className="w-4/5">
            <Payment />
            <ImageApprov />
          </div>
        </div>
      ) : (
        router.push("/login")
      )}

      <div className="flex justify-center items-center m-20">
        <button className="" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </main>
  );
};

export default Home;
