import { useEffect, useState } from "react";
import FrdContainer from "../components/FrdContainer";
import parseJwt from "../utils/checkToken";
function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getFriends();
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
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.message);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="FriendsList">
      {friends.length > 0 ? (
        <div className="friends">
          {friends.map((friend, i) => (
            <FrdContainer key={i} friend={friend} />
          ))}
        </div>
      ) : (
        <div>No friends.</div>
      )}
    </div>
  );
}

export default FriendsList;
