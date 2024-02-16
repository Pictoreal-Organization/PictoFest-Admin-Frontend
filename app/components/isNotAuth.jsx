"use client";

import { useAuth } from "@/app/context/Auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isNotAuth(Component) {
  return function IsNotAuth(props) {
    // const { isUserAuthenticated } = useAuth();
    // const auth = isUserAuthenticated();
    const auth =
      typeof window !== "undefined" ? !!localStorage.getItem("admin_token") : "";

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, [auth]);

    return <Component {...props} />;
  };
}
