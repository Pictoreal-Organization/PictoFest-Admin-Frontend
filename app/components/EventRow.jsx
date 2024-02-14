const EventRow = (props) => {
  const { event } = props;

  return (
    <tr>
      <td className="border border-1 border-black p-2">{event.id}</td>
      <td className="border border-1 border-black p-2">{event.name}</td>
      <td className="border border-1 border-black p-2">{event.event_category}</td>
      <td className="border border-1 border-black p-2">{event.event_code}</td>
      <td className="border border-1 border-black p-2">{event.price}</td>
      <td className="border border-1 border-black p-2">
        {event.registrations}
      </td>
    </tr>
  );
};

export default EventRow;
