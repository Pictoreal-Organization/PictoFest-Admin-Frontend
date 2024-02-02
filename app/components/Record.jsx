import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth-context";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function Record({ payment }) {
  const { adminAuthState } = useContext(AuthContext);
  const token = adminAuthState.token;

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImlhdCI6MTcwNjU0OTY4M30.87d92x1XlgjTG91PS-Ll_ckK2_ygkShuNlHDP1mKo-4";

  const handleChange = async (payment_id, value) => {
    const paymentid = payment_id;
    var status = "";
    if (value === "accepted") {
      status = "approvepayment";
    } else if (value === "rejected") {
      status = "rejectpayment";
    }
    try {
      const response = await axios.post(
        `${baseURL}/adminApproval/${status}`,
        {
          payment_id: paymentid,
        },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      console.log(response.data);
    } catch (err) {
      //   toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="text-lg grid grid-cols-5 justify-around text-black"
        key={payment.id}
      >
        <p className="mx-auto">{payment.id}</p>
        <p className="mx-auto">{payment.fk_user}</p>
        <p className="mx-auto">{payment.transaction_id}</p>
        <p className="mx-auto">{payment.amount}</p>
        {/* <p className="mx-24">{payment.event_ids}</p> */}
        <select
          id=""
          className="w-3/5 mx-auto"
          onChange={(e) => handleChange(payment.id, e.target.value)}
        >
          <option value="accepted">Accepted</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </>
  );
}

export default Record;
