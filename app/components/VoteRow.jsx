import Link from "next/link";
import { FaImage, FaDownload } from "react-icons/fa";
import api from "@/app/api";

const VoteRow = (props) => {
  const { entry, index } = props;

  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }

    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(
        `/dashboard/download?imageUrl=${entry.image_link}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = entry.image_link.split("/").pop() || "download.jpg";
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <tr>
      <td className="border border-1 border-black p-2">{index + 1}</td>
      <td className="border border-1 border-black p-2">{entry.id}</td>
      <td className="border border-1 border-black p-2">{entry.ticket_id}</td>
      <td className="border border-1 border-black p-2">
        {entry.first_name + " " + entry.last_name}
      </td>
      <td className="border border-1 border-black p-2">{entry.event_code}</td>
      <td className="border border-1 border-black p-2">
        <div className="flex justify-center items-center gap-3">
          <Link target="_blank" href={entry.image_link}>
            <FaImage />
          </Link>
          <button onClick={handleDownload} title="Download Image">
            <FaDownload />
          </button>
        </div>
      </td>
      <td className="border border-1 border-black p-2">{entry.votes}</td>
    </tr>
  );
};

export default VoteRow;
