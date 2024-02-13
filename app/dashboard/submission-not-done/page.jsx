"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/app/api";
import Hardcopy from "@/app/components/Hardcopy";

const Pending = () => {
  const [imageData, setimageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/dashboard/physubmission/notdone");
      const imageDetails = await response.data;

      toast.success(response.data.message);
      setimageData(imageDetails.data);
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
    <div className="flex">
      <table className="w-4/5 mx-auto mt-4">
        <thead>
          <tr className="flex justify-around text-xl border border-black">
            <th className=" border-black mx-4">Image id</th>
            <th className="mx-4">Name</th>
            <th className=" border-black mx-4">URL</th>
            <th className="mx-4">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {imageData &&
            imageData.map((image) => <Hardcopy key={image.id} image={image} />)}
        </tbody>
      </table>
    </div>
  );
}

export default Pending;
