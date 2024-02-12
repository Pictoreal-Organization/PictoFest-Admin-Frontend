"use client";

import { useAuth } from "@/app/context/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component) {
  return function IsAuth(props) {
    // const { isUserAuthenticated } = useAuth();
    // const auth = isUserAuthenticated();
    const auth = typeof window !== "undefined" ? !!localStorage.getItem("admin_token") : "";

    useEffect(() => {
      if (auth) {
        return redirect("/dashboard");
      }
    }, [auth]);

    if (auth) {
      return (
        <div className="bg-[url('/img/login/website_cream.png')] h-screen bg-cover"></div>
      );
    }

    return <Component {...props} />;
  };
}