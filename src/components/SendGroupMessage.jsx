import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa6";

function SendGroupMessage() {
  const [text, setText] = useState("");
  const { groupId } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  async function sendGroupMessage() {
    setLoading(true);
    const formData = new FormData();
    if (text !== "") {
      formData.append("text", text);
    }

    if (typeof image !== "undefined") {
      formData.append("image", image);
    }
    try {
      const res = await fetch(
        `http://localhost:3000/users/${userId}/groups/${groupId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      setLoading(false);
      setImage();
    } catch (err) {
      console.log(err);
      //setErr(err.message)
      setLoading(false);
      setImage();
    }
  }
  return (
    <div className="SendGroupMessage">
      <label htmlFor="image">
        <FaImage />
      </label>

      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input
        type="text"
        maxLength="150"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={loading ? console.log() : sendGroupMessage}>
        {loading ? <div>Loading...</div> : <IoMdSend className="icon" />}
      </button>
    </div>
  );
}

export default SendGroupMessage;
