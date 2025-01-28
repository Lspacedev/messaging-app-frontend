import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import FriendDetails from "../components/FriendDetails";
import parseJwt from "../utils/checkToken";
import { IoCloseOutline } from "react-icons/io5";

function FrdContainer({ friend, users }) {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currFriend, setSetCurrFriend] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (users && users.length > 0) {
      const [filteredFriend] = data.users.filter(
        (usr) => usr.id === friend.friendId
      );

      setUser(filteredFriend);
    }
  }, [friend]);
  function openFriendMenu() {
    const search = document.querySelector(".FriendDetails");
    search.classList.toggle("active");
  }
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  async function goToMessage() {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${friend.friendId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": 0,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setLoading(false);

      navigation(`/home/inbox/${data.id}`);
    } catch (err) {
      console.log(err);
      //setErr(err.message)
      setLoading(false);
    }
  }
  async function deleteFriend(id) {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/friends/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": 0,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLoading(false);
      navigation(0);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="FrdContainer">
      <div className="remove" onClick={() => deleteFriend(friend.id)}>
        <IoCloseOutline />
      </div>
      <div className="frd-clickable">
        <img
          src="/images/blank-profile-picture-973460_1280.png"
          alt="profile"
        />
        <div>{friend && friend.username}</div>
        <div className="onlineStatus">
          <div
            className={user && user.onlineStatus ? "online" : "offline"}
          ></div>
          <br />
          <div className="status">
            {user && user.onlineStatus ? "online" : "offline"}
          </div>
        </div>
      </div>
      <button onClick={loading ? () => console.log() : () => goToMessage()}>
        {loading ? "Loading..." : "message"}
      </button>
    </div>
  );
}

export default FrdContainer;
