import { useEffect, useState } from "react";
import FrdContainer from "../components/FrdContainer";
import parseJwt from "../utils/checkToken";
function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      setLoading(true);
      await getFriends();
      await getUsers();
      setLoading(false);
    })();
  }, []);
  async function getFriends() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setFriends(data);
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  }
  async function getUsers() {
    try {
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="FriendsList">
      {friends && friends.length > 0 ? (
        <div className="friends">
          {friends.map((friend, i) => (
            <FrdContainer key={i} friend={friend} users={users} />
          ))}
        </div>
      ) : (
        <div>No friends.</div>
      )}
    </div>
  );
}

export default FriendsList;
