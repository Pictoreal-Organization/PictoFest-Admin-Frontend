import Link from "next/link";
import { FaImage } from "react-icons/fa";

const VoteRow = (props) => {
  const { entry, index } = props;

  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }

    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
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
        <Link
          className="flex justify-center"
          target="_blank"
          href={trimString(entry.image_link, 2) + "3D"}
        >
          <FaImage />
        </Link>
      </td>
      <td className="border border-1 border-black p-2">{entry.votes}</td>
    </tr>
  );
};

export default VoteRow;
