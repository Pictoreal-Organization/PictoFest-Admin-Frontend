"use client";
import axios from "axios";
import Image from "./Image";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/auth-context";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const ImageApprov = () => {
  const { adminAuthState } = useContext(AuthContext);
  const token = adminAuthState.token;
  const [imageData, setimageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImlhdCI6MTcwNjU0OTY4M30.87d92x1XlgjTG91PS-Ll_ckK2_ygkShuNlHDP1mKo-4";

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/adminDashboard/userevents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const imageDetails = await response.data;

      toast.success(response.data.message);
      setimageData(imageDetails.data);
      console.log(imageDetails.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <table className="w-full mx-auto mt-4">
      <thead>
        <tr className="flex justify-around text-xl border border-black">
          <th className=" border-black mx-4">Image id</th>
          <th className="mx-4">Name</th>
          <th className=" border-black mx-4">URL</th>
          <th className="mx-4">Status</th>
        </tr>
      </thead>
      <tbody>
        {imageData &&
          imageData.map((image) => <Image key={image.id} image={image} />)}
      </tbody>
    </table>
  );
};

export default ImageApprov;
