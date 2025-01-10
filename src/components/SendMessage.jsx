import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
function SendMessage() {
  const [text, setText] = useState("");
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  async function sendReply() {
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
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/messages/${uid}`,
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
    <div className="SendMessage">
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
      <button onClick={loading ? console.log() : sendReply}>
        {loading ? <div>Loading...</div> : <IoMdSend className="icon" />}
      </button>
    </div>
  );
}

export default SendMessage;
