import axios from "axios";
import { toast } from "sonner";
import { baseURL } from "../api";
import { useAuth } from "../context/Auth";

function Image({ image }) {
  const { adminAuthState } = useAuth();
  const token = adminAuthState.token;

  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImlhdCI6MTcwNjU0OTY4M30.87d92x1XlgjTG91PS-Ll_ckK2_ygkShuNlHDP1mKo-4";

  const handleChange = async (image_id, value) => {
    const imageid = image_id;
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
          image_id: imageid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="text-lg grid grid-cols-4 justify-around text-black"
        key={image.id}
      >
        <p className="mx-auto">{image.id}</p>
        <p className="mx-auto">{image.fk_user}</p>
        <a className="mx-auto" href={image.image_link} />
        {/* <p className="mx-24">{payment.event_ids}</p> */}
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </>
  );
}

export default Image;
