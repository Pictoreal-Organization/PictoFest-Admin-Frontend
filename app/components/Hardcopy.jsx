import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import api from "@/app/api";

const Image = ({ image }) => {

  const handleChange = async (image_id, value) => {
    var status = "";
    if (value === "submitted") {
      status = "physubmission";
    }
    console.log(status);
    try {
      const response = await api.post(`/approval/${status}`,{ user_event_id: image_id });
      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
    }
    const router = useRouter();
    router.reload();
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
            value="submitted"
            onChange={(e) => handleChange(image.id, e.target.value)}
          />
          <span class="slider round"></span>
        </label>
      </div>
    </>
  );
}

export default Image;
