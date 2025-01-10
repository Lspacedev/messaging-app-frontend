import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parseJwt from "../utils/checkToken";
import SendGroupMessage from "../components/SendGroupMessage";
import io from "socket.io-client";

function Group() {
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { groupId } = useParams();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getGroup();
    getUsers();
  }, []);

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");

    socket.on("connnection", () => {
      console.log("connected to server");
    });

    socket.on("group-msg-added", (group) => {
      setGroup(group);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });
  }, []);
  async function getGroup() {
    try {
      const res = await fetch(
        `http://localhost:3000/users/${userId}/groups/${groupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setGroup(data.group);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  }

  async function getUsers() {
    try {
      const res = await fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();

        setUsers(data.users);

        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="Group">
      <div className="message-header">
        <div className="message-name">{group && group.groupName}</div>
        <p>
          Members:
          {group && group.adminId != ""
            ? group.member && group.member.length + 1
            : group.member && group.member.length}
        </p>
      </div>

      <div className="texts">
        {JSON.stringify(group) !== "{}" &&
        group.groupMessages &&
        group.groupMessages.length > 0 ? (
          group.groupMessages.map((message, i) => (
            <div
              key={i}
              className={`${message.authorId != userId ? "left" : "right"}`}
            >
              <p className="name">
                {users &&
                  message &&
                  users.length > 0 &&
                  users.filter((user) => user.id == message.authorId)[0]
                    .username}
              </p>

              <p>{message.text}</p>
              {message &&
                typeof message.imageUrl !== "undefined" &&
                message.imageUrl !== null &&
                message.imageUrl !== "" && (
                  <div className="text-image">
                    <img src={message.imageUrl} />
                  </div>
                )}
              <span>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  timeStyle: "short",
                })}
              </span>
            </div>
          ))
        ) : (
          <div style={{ color: "gray" }}>No messages</div>
        )}
      </div>

      <SendGroupMessage />
    </div>
  );
}

export default Group;
