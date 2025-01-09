import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import FriendDetails from "../components/FriendDetails";
import parseJwt from "../utils/checkToken";
import { IoCloseOutline } from "react-icons/io5";

function FrdContainer({ friend }) {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currFriend, setSetCurrFriend] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    getUsers();
  }, [friend]);
  function openFriendMenu() {
    const search = document.querySelector(".FriendDetails");
    search.classList.toggle("active");
  }
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  async function goToMessage() {
    try {
      const res = await fetch(
        `http://localhost:3000/users/${friend.friendId}/messages`,
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
      navigation(`/home/inbox/${data.id}`);

      //setLoading(false);
    } catch (err) {
      console.log(err);
      //setErr(err.message)
    }
  }
  async function deleteFriend(id) {
    try {
      const res = await fetch(
        `http://localhost:3000/users/${userId}/friends/${id}`,
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
  async function getUsers() {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const [filteredFriend] = data.users.filter(
          (usr) => usr.id === friend.friendId
        );

        setUser(filteredFriend);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  if (loading) return <div>Loading...</div>;

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
      <button onClick={goToMessage}>message</button>
    </div>
  );
}

export default FrdContainer;
