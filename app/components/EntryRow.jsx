import Link from "next/link";
import { FaImage } from "react-icons/fa";

const EntryRow = (props) => {
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
        {entry.fk_user_event}
      </td>
      <td className="border border-1 border-black p-2">
        {entry.first_name + " " + entry.last_name}
      </td>
      <td className="border border-1 border-black p-2">{entry.event_code}</td>
      <td className="border border-1 border-black p-2">
        <Link
          className="flex justify-center"
          target="_blank"
          href={entry.image_link}
        >
          <FaImage />
        </Link>
      </td>
    </tr>
  );
};

export default EntryRow;
