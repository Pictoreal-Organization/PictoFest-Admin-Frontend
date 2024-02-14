import api from "@/app/api";
import { toast } from "sonner";

const PaymentRow = (props) => {
  const { payment, setPayments } = props;

  const handleAccept = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/approval/approvepayment`, {
        payment_id: payment.id,
      });

      setPayments((prev) =>
        prev.map((item) => {
          if (item.id === payment.id) {
            return { ...item, status: "ACCEPTED" };
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

  const handleReject = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/approval/rejectpayment`, {
        payment_id: payment.id,
      });

      setPayments((prev) =>
        prev.map((item) => {
          if (item.id === payment.id) {
            return { ...item, status: "REJECTED" };
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
      <td className="border border-1 border-black p-2">{payment.id}</td>
      <td className="border border-1 border-black p-2">
        {payment.first_name + " " + payment.last_name}
      </td>
      <td className="border border-1 border-black p-2">
        {payment.transaction_id}
      </td>
      <td className="border border-1 border-black p-2">{payment.amount}</td>
      <td className="border border-1 border-black p-2">
        {payment.status !== "PENDING" ? (
          payment.status
        ) : (
          <div className="flex justify-center items-center gap-5">
            <button
              className="bg-green-500 px-2 py-1 rounded-md text-white"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="bg-red-500 px-2 py-1 rounded-md text-white"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default PaymentRow;
