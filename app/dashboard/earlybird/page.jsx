"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/app/api";

const EarlyBirdCodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUnusedCodes = async () => {
    try {
      const res = await api.get("/dashboard/earlyBirdUnusedCodes?status=unused");
      setCodes(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch codes");
    }
  };

  const generateCode = async () => {
    try {
      setLoading(true);
      const res = await api.post("/approval/generateearlybirdcode");
      toast.success(`Generated: ${res.data.code}`);
      fetchUnusedCodes();
    } catch (err) {
      toast.error("Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnusedCodes();
  }, []);

  return (
    <div className="w-4/5 mx-5">
      <div className="flex justify-between items-center my-5">
        <h2 className="text-2xl font-semibold">Early Bird Codes</h2>
        <button
          onClick={generateCode}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Code"}
        </button>
      </div>

      <table className="w-full text-center border-collapse my-5">
        <thead>
          <tr className="border border-black">
            <th className="border p-2">#</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((c, i) => (
            <tr key={c.code}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2 font-mono">{c.code}</td>
              <td className="border p-2">UNUSED</td>
            </tr>
          ))}

          {codes.length === 0 && (
            <tr>
              <td colSpan={3} className="p-5 text-gray-500">
                No unused codes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EarlyBirdCodes;
