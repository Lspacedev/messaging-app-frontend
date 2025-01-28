import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parseJwt from "../utils/checkToken";
import SendMessage from "../components/SendMessage";
import io from "socket.io-client";

function Message() {
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { uid } = useParams();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    const socket = io.connect(`${import.meta.env.VITE_PROD_URL}`);

    socket.on("connnection", () => {
      console.log("connected to server");
    });

    socket.on("reply-added", (message) => {
      setMessage(message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);
  async function getMessage() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/messages/${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      setMessage(data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="Message">
      <div className="message-header">
        <div className="message-name">
          {message && message.senderId === Number(userId)
            ? message.receiverUsername
            : message.senderUsername}
        </div>
      </div>

      {JSON.stringify(message) !== "{}" && message && (
        <div className="texts">
          {message.replies && message.replies.length > 0 ? (
            message.replies.map((reply, i) => (
              <div
                key={i}
                className={`${reply.authorId != userId ? "left" : "right"}`}
              >
                <p>{reply.text}</p>
                {reply &&
                  typeof reply.imageUrl !== "undefined" &&
                  reply.imageUrl !== null &&
                  reply.imageUrl !== "" && (
                    <div className="text-image">
                      <img src={reply.imageUrl} />
                    </div>
                  )}
                <span>
                  {new Date(reply.timestamp).toLocaleTimeString([], {
                    timeStyle: "short",
                  })}
                </span>
              </div>
            ))
          ) : (
            <div style={{ color: "gray" }}>No messages</div>
          )}
        </div>
      )}

      <SendMessage
        isReply={message && JSON.stringify(message) !== "{}" ? true : false}
      />
    </div>
  );
}

export default Message;
