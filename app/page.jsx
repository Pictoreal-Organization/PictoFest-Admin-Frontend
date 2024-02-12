"use client";

import axios from "axios";
import { toast } from "sonner";
import { Lobster } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/app/context/Auth";
import { baseURL } from "@/app/api";
import isAuth from "@/app/components/isAuth";

const inter = Lobster({ subsets: ["latin"], weight: "400" });

const Login = () => {
  const router = useRouter();
  const { setAdminAuthInfo } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);

  const eyeHandler = () => {
    setShowEye(!showEye);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/admin/login`, {
        username,
        password,
      });

      setAdminAuthInfo(response.data.data);

      toast.success(response.data.message);

      router.push("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <main className={inter.className}>
      <div className="flex justify-center items-center h-screen bg-[url('/img/login/website_cream.png')] bg-cover">
        <div className="bg-[#EAE1CF] p-6 rounded-xl shadow-2xl sm:w-auto sm:p-4">
          <div className=" bg-[#EAE1CF] border-4 border-dashed border-neutral-500 p-6 rounded-lg drop-shadow-sm w-72 sm:w-auto sm:h-auto sm:p-10">
            <div className="flex flex-col justify-center text-neutral-500 items-center font-semibold mb-5">
              <h1 className="text-3xl pb-2  font-bold sm:text-5xl">
                Welcome Back!
              </h1>
              <h1 className="border-t border-neutral-500 pt-2 sm:pb-2 sm:text-xl">
                Log in to Admin
              </h1>
            </div>

            <div className="w-full relative">
              <input
                className="w-full outline-none  h-10 sm:h-12 p-3 mb-4 bg-[#F8E9CB] rounded-xl ring-2 ring-neutral-500 text-neutral-500 placeholder-neutral-500"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="w-full outline-none h-10 sm:h-12 p-3 mb-4 bg-[#F8E9CB] rounded-xl ring-2 ring-neutral-500 text-neutral-500 placeholder-neutral-500"
                type={showEye ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-4 sm:bottom-8 bottom-7"
                onClick={eyeHandler}
              >
                {showEye ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <div className=" flex justify-center items-center">
              <button
                onClick={handleLogin}
                className=" w-40 sm:w-40  outline-none font-semibold ring-2 ring-neutral-500 text-neutral-500 p-2 mb-3 bg-[#F8E9CB] rounded-xl hover:bg-[#e8d396]"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default isAuth(Login);
