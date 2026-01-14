import api from "@/app/api";
import Link from "next/link";
import { toast } from "sonner";
import { FaImage } from "react-icons/fa";

const PhysubmissionRow = (props) => {
  const { userEvent, setUserEvents, index } = props;

  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }

    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
  };

  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/approval/physubmission`, {
        user_event_id: userEvent.id,
      });

      setUserEvents((prev) =>
        prev.map((item) => {
          if (item.id === userEvent.id) {
            return { ...item, phy_submission: true };
          }
          return item;
        })
      );

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <tr>
      <td className="border border-1 border-black p-2">{index + 1}</td>
      <td className="border border-1 border-black p-2">{userEvent.id}</td>
      <td className="border border-1 border-black p-2">
        {userEvent.first_name + " " + userEvent.last_name}
      </td>
      <td className="border border-1 border-black p-2">{userEvent.name}</td>
      <td className="border border-1 border-black p-2">
        {userEvent.image_uploaded ? "Uploaded" : "Not Uploaded"}
      </td>
      <td className="border border-1 border-black p-2">
        {userEvent.image_uploaded ? (
          <Link
            className="flex justify-center"
            target="_blank"
            href={trimString(userEvent.image_link, 2) + "3D"}
          >
            <FaImage />
          </Link>
        ) : (
          "NA"
        )}
      </td>
      <td className="border border-1 border-black p-2 text-center">
        {userEvent.photocopy_needed ? "Yes" : "No"}
      </td>

      <td className="border border-1 border-black p-2">
        {userEvent.phy_submission ? (
          "Received"
        ) : (
          <div className="flex justify-center items-center gap-5">
            <button
              className="bg-green-500 px-2 py-1 rounded-md text-white"
              onClick={handleApprove}
            >
              Approve
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default PhysubmissionRow;
