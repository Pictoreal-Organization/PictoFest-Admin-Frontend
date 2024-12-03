"use client";

import Payment from "./components/Payment";
import SideBar from "./components/SideBar";
import ImageApprov from "./components/ImageApprov";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/app/api";
import { useAuth } from "@/app/context/Auth";
import isNotAuth from "@/app/components/isNotAuth";

const Home = () => {

  return (
    <main className="">
      <div className="flex">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5">
          <Payment />
          <ImageApprov />
        </div>
      </div>

      <div className="flex justify-center items-center m-20">
        <button className="" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </main>
  );
};

export default isNotAuth(Home);
