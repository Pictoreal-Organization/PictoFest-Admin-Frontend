"use client";

import { useAuth } from "@/app/context/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component) {
  return function IsAuth(props) {
    // const { isUserAuthenticated } = useAuth();
    // const auth = isUserAuthenticated();
    const auth =
      typeof window !== "undefined" ? !!localStorage.getItem("token") : "";

    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, [auth]);

    if (!auth) {
      return (
        <div className="bg-[url('/img/home/landingbg.jpeg')] h-screen bg-cover"></div>
      );
    }

    return <Component {...props} />;
  };
}