// import Link from "next/link";
// import { FaImage } from "react-icons/fa";

// const EntryRow = (props) => {
//   const { entry, index } = props;

//   const trimString = (str, length) => {
//     if (str.length <= length * 2) {
//       return str;
//     }

//     const trimmedLength = str.length - length * 2;
//     return str.substring(length, trimmedLength);
//   };

//   return (
//     <tr>
//       <td className="border border-1 border-black p-2">{index + 1}</td>
//       <td className="border border-1 border-black p-2">{entry.id}</td>
//       <td className="border border-1 border-black p-2">{entry.ticket_id}</td>
//       <td className="border border-1 border-black p-2">
//         {entry.fk_user_event}
//       </td>
//       <td className="border border-1 border-black p-2">
//         {entry.first_name + " " + entry.last_name}
//       </td>
//       <td className="border border-1 border-black p-2">{entry.event_code}</td>
//       <td className="border border-1 border-black p-2">
//         <Link
//           className="flex justify-center"
//           target="_blank"
//           href={entry.image_link}
//         >
//           <FaImage />
//         </Link>
//       </td>
//     </tr>
//   );
// };

// export default EntryRow;

"use client";

import { FaImage } from "react-icons/fa";
import Link from "next/link";

const EntryRow = ({ entries }) => {

  const downloadCSV = () => {
    if (!entries || entries.length === 0) {
      alert("No data available to download");
      return;
    }

    const headers = [
      "Sr No",
      "ID",
      "Ticket ID",
      "User Event ID",
      "Name",
      "Event Code",
      "Image Link"
    ];

    const rows = entries.map((entry, index) => [
      index + 1,
      entry.id,
      entry.ticket_id,
      entry.fk_user_event,
      `${entry.first_name} ${entry.last_name}`,
      entry.event_code,
      entry.image_link
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map(row => row.map(item => `"${item}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "Entries_Data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">

      {/* ✅ Download Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Download CSV
        </button>
      </div>

      {/* ✅ Table */}
      <table className="w-full border border-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2">Sr No</th>
            <th className="border border-black p-2">ID</th>
            <th className="border border-black p-2">Ticket ID</th>
            <th className="border border-black p-2">User Event ID</th>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Event Code</th>
            <th className="border border-black p-2">Image</th>
          </tr>
        </thead>

        <tbody>
          {entries && entries.length > 0 ? (
            entries.map((entry, index) => (
              <tr key={entry.id}>
                <td className="border border-black p-2">{index + 1}</td>
                <td className="border border-black p-2">{entry.id}</td>
                <td className="border border-black p-2">{entry.ticket_id}</td>
                <td className="border border-black p-2">{entry.fk_user_event}</td>
                <td className="border border-black p-2">
                  {entry.first_name} {entry.last_name}
                </td>
                <td className="border border-black p-2">{entry.event_code}</td>
                <td className="border border-black p-2 text-center">
                  <Link target="_blank" href={entry.image_link}>
                    <FaImage className="mx-auto cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="border border-black p-4 text-center"
              >
                No Entries Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EntryRow;