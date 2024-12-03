const UserRow = (props) => {
  const { user, index } = props;

  return (
    <tr>
      <td className="border border-1 border-black p-2">{index+1}</td>
      <td className="border border-1 border-black p-2">{user.id}</td>
      <td className="border border-1 border-black p-2">
        {user.first_name + " " + user.last_name}
      </td>
      <td className="border border-1 border-black p-2">{user.email}</td>
      <td className="border border-1 border-black p-2">{user.mobile_number}</td>
      <td className="border border-1 border-black p-2">{user.college_type}</td>
      <td className="border border-1 border-black p-2">{user.college_name}</td>
    </tr>
  );
};

export default UserRow;
