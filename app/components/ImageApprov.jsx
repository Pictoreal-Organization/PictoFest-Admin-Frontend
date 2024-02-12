"use client";
import axios from "axios";
import Image from "./Image";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { baseURL } from "../api";

const ImageApprov = () => {
  const { adminAuthState } = useAuth();
  const token = adminAuthState.token;
  const [imageData, setimageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/dashboard/userevents`, {
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
