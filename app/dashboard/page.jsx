"use client";

import isNotAuth from "@/app/components/isNotAuth";
import Payment from "@/app/components/Payment";

const Home = () => {

  return (
    <main className="">
      <Payment />
    </main>
  );
};

export default isNotAuth(Home);
