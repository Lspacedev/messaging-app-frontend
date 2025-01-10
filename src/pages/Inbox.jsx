import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import MsgContainer from "../components/MsgContainer";
import io from "socket.io-client";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const { uid } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const socket = io.connect(`${import.meta.env.VITE_PROD_URL}`);
    socket.on("m", () => {
      console.log("connected to server");
    });

    socket.on("message-added", (messages) => {
      console.log("msg", messages);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);

  async function getMessages() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setMessages(data.messages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  }
  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="Inbox">
      {typeof uid === "undefined" ? (
        <div className="messages">
          {messages.length > 0 ? (
            messages.map((message, i) => (
              <MsgContainer key={i} message={message} />
            ))
          ) : (
            <div>No messages</div>
          )}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Inbox;
