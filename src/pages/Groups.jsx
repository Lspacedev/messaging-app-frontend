import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import GrpContainer from "../components/GrpContainer";

function Groups() {
  const navigation = useNavigate();
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { groupId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getMessages();
    getFriends();
  }, []);

  async function getFriends() {
    setLoading(true);

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
      setLoading(false);
    }
  }
  async function getMessages() {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/groups`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setGroups(data.groups);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  }

  function addMembers(e) {
    e.preventDefault();
    setMembers((prev) => [...prev, { id: e.target.value }]);
  }
  async function addGroup() {
    try {
      if (friends && friends.length === 0) {
        alert("No members to add");
        return;
      }
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": 0,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ groupName, members }),
        }
      );

      if (res.ok) {
        //const data = await res.json();
        setAdd(false);
        setLoading(false);

        navigation(0);
      }

      //setLoading(false);
    } catch (err) {
      console.log(err);
      //setErr(err.message)
      setLoading(false);
    }
  }
  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="Groups">
      {typeof groupId === "undefined" ? (
        <>
          {add === false && (
            <button className="group-add-btn" onClick={() => setAdd(!add)}>
              Add Group
            </button>
          )}
          {add && (
            <div className="group-div">
              <div onClick={() => setAdd(!add)} className="form-close">
                x
              </div>
              <div className="form">
                Group Name
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                {
                  <div className="friendsList">
                    <div>Add friends</div>

                    {friends && friends.length > 0 ? (
                      friends.map((friend, i) => (
                        <div key={i} className="check">
                          <input
                            type="checkbox"
                            name={`${friend.friendId}`}
                            value={`${friend.friendId}`}
                            onChange={(e) => addMembers(e)}
                          />
                          {friend.username}
                        </div>
                      ))
                    ) : (
                      <div>No friends.</div>
                    )}
                  </div>
                }
                <button onClick={addGroup}>Add</button>
              </div>
            </div>
          )}
          <div className="groups">
            {groups && groups.length > 0 ? (
              groups.map((group, i) => <GrpContainer key={i} group={group} />)
            ) : (
              <div>No groups</div>
            )}
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Groups;
