import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

function FriendDetails({ friend }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUsers();
  }, [friend]);
  function closeFriendMenu() {
    const search = document.querySelector(".FriendDetails");
    search.classList.toggle("active");
  }
  async function getUsers() {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/users`, {
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

  return (
    <div className="FriendDetails">
      <div className="closebtn" onClick={closeFriendMenu}>
        <IoCloseOutline />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="username">{user && user.username}</div>
          <div className="onlineStatus">
            <div
              className={user && user.onlineStatus ? "online" : "offline"}
            ></div>
            <br />
            <div className="status">
              {user && user.onlineStatus ? "online" : "offline"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FriendDetails;
