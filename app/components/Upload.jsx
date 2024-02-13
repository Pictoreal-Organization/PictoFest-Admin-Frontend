import React from "react";
import { toast } from "sonner";
import api from "@/app/api";

const Upload = ({ image }) => {

  const handleChange = async (image_id, value) => {
    var status = "";
    if (value === "approved") {
      status = "approveimage";
    }
    try {
      const response = await api.post(`/adminApproval/${status}`, { user_event_id: image_id });
      toast.success(response.data.message);
      console.log(response.data);
    } catch (err) {
      console.error(err);
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
        <a className="mx-auto" href={image.image_link} />{" "}
        <label class="switch">
          <input
            type="checkbox"
            value="uploaded"
            onChange={(e) => handleChange(image.id, e.target.value)}
          />
          <span class="slider round"></span>
        </label>
      </div>
    </>
  );
}

export default Upload;
